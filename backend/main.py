from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import xml.etree.ElementTree as ET
from typing import List, Set
from collections import defaultdict

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Surface(BaseModel):
    name: str
    material: str
    area: float

class CalculationResult(BaseModel):
    name: str
    volume: float
    target_rt: float
    calculated_rt: float
    deviation: float
    surfaces: List[Surface]

@app.post("/upload", response_model=CalculationResult)
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".xml"):
        raise HTTPException(status_code=400, detail="Файл должен быть в формате XML")

    try:
        contents = await file.read()
        root = ET.fromstring(contents)

        
        name = root.attrib.get("name", "Неизвестное помещение")
        cx = float(root.attrib.get("cx", 0))
        cy = float(root.attrib.get("cy", 0))
        cz = float(root.attrib.get("cz", 0))
        volume = cx * cy * cz

        
        target_rt = 0.6

        
        MATERIAL_FOR_CEILING = "Акустический подвесной потолок (Armstrong)"
        MATERIAL_FOR_FLOOR = "Ковровое покрытие с высоким ворсом"
        
        MATERIALS_FOR_WALLS = ["Акустическая панель из перфорированного гипса", "Деревянные акустические панели"]
        MATERIAL_FOR_OTHER = "Звукопоглощающая плита" 

        
        wall_material_index = 0

        surfaces = []
        for polyobject in root.findall("polyobject"):
            poly_name = polyobject.attrib.get("name", "Без имени")
            
            
            lower_poly_name = poly_name.lower()
            
            current_material = MATERIAL_FOR_OTHER 

            if "ceiling" in lower_poly_name or "потолок" in lower_poly_name:
                current_material = MATERIAL_FOR_CEILING
            elif "floor" in lower_poly_name or "пол" in lower_poly_name:
                current_material = MATERIAL_FOR_FLOOR
            elif "wall" in lower_poly_name or "стена" in lower_poly_name:
               
                current_material = MATERIALS_FOR_WALLS[wall_material_index]
                
                wall_material_index = (wall_material_index + 1) % len(MATERIALS_FOR_WALLS)
            
            for face in polyobject.findall("face"):
                vertices = [
                    (
                        float(v.attrib["x"]),
                        float(v.attrib["y"]),
                        float(v.attrib["z"])
                    )
                    for v in face.findall("vertex")
                ]

                
                if len(vertices) == 4:
                    def vector(a, b): return (b[0]-a[0], b[1]-a[1], b[2]-a[2])
                    def cross(u, v): return (
                        u[1]*v[2] - u[2]*v[1],
                        u[2]*v[0] - u[0]*v[2],
                        u[0]*v[1] - u[1]*v[0]
                    )
                    def norm(v): return (v[0]**2 + v[1]**2 + v[2]**2) ** 0.5

                    u = vector(vertices[0], vertices[1])
                    v = vector(vertices[0], vertices[3])
                    area = norm(cross(u, v))
                else:
                    area = 0

                
                surfaces.append(Surface(name=poly_name, material=current_material, area=round(area, 2)))

        
        grouped = defaultdict(lambda: {"materials": set(), "area": 0.0})
        for surface in surfaces:
            grouped[surface.name]["materials"].add(surface.material)
            grouped[surface.name]["area"] += surface.area

        combined_surfaces = [
            Surface(
                name=name,
                material=" + ".join(sorted(list(data["materials"]))), 
                area=round(data["area"], 2)
            )
            for name, data in grouped.items()
        ]

        avg_absorption = 0.2  
        surface_area = sum(s.area for s in combined_surfaces)
        sabine_rt = 0.161 * volume / (surface_area * avg_absorption) if surface_area > 0 else 0
        calculated_rt = round(sabine_rt, 3)
        deviation = round(calculated_rt - target_rt, 3)

        return CalculationResult(
            name=name,
            volume=round(volume, 2),
            target_rt=target_rt,
            calculated_rt=calculated_rt,
            deviation=deviation,
            surfaces=combined_surfaces
        )

    except ET.ParseError:
        raise HTTPException(status_code=400, detail="Некорректный XML-файл")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка обработки: {str(e)}")