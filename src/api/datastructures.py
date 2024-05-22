class CarsStructure: 
    def __init__(self):
        self._members = [
            {
                "id": 1,
                "marca_modelo": "Audi", 
                "matricula": "1234HPW",
                "motor":"Gasolina",
                "tipo_cambio": "Hibrido",
                "asientos": "5",
                "precio": "50",
                "user_id": 1,
                "precio_id_stripe": "1",
                "url_img" : "https://res-console.cloudinary.com/ddfq21pdb/thumbnails/v1/image/upload/v1716157903/aHE3MjBfa3dzamhi/drilldown"
            }
        ]

    def get_all_vehicles(self):
        return self._members
    