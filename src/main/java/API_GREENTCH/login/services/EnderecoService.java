package API_GREENTCH.login.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import API_GREENTCH.login.repositories.EnderecoRepository;
import API_GREENTCH.models.Endereco;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String BRASIL_API_URL = "https://brasilapi.com.br/api/cep/v2/";

    public Endereco salvarEndereco(Endereco endereco) {
        System.out.println("Entrou");
        if (endereco.getCep() != null) {
            System.out.println(BRASIL_API_URL);
            // Constrói a URL da API com o CEP
            String url = BRASIL_API_URL + endereco.getCep();
            System.out.println(url);

            // Faz a chamada à API e mapeia a resposta
            try {
                CepResponse cepResponse = restTemplate.getForObject(url, CepResponse.class);
                if (cepResponse != null && cepResponse.getLocation() != null && cepResponse.getLocation().getCoordinates() != null) {
                    // Converte as coordenadas de String para float
                    endereco.setLatitude(Float.parseFloat(cepResponse.getLocation().getCoordinates().getLatitude()));
                    endereco.setLongitude(Float.parseFloat(cepResponse.getLocation().getCoordinates().getLongitude()));
                    endereco.setCidade(cepResponse.getCity());
                    endereco.setEstado(cepResponse.getState());
                }
            } catch (Exception e) {
                System.err.println("Erro ao buscar coordenadas para o CEP: " + e.getMessage());
            }
        }

        return enderecoRepository.save(endereco);
    }

    public Optional<Endereco> getEndereco(Long id){
        return enderecoRepository.findById(id);
    }

    // Classe para mapear a resposta da API
    public static class CepResponse {
        private String cep;
        private String state;
        private String city;
        private String neighborhood;
        private String street;
        private String service;
        private Location location;

        // Getters e Setters
        public String getCep() {
            return cep;
        }

        public void setCep(String cep) {
            this.cep = cep;
        }

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getNeighborhood() {
            return neighborhood;
        }

        public void setNeighborhood(String neighborhood) {
            this.neighborhood = neighborhood;
        }

        public String getStreet() {
            return street;
        }

        public void setStreet(String street) {
            this.street = street;
        }

        public String getService() {
            return service;
        }

        public void setService(String service) {
            this.service = service;
        }

        public Location getLocation() {
            return location;
        }

        public void setLocation(Location location) {
            this.location = location;
        }

        // Classe interna para representar "location"
        public static class Location {
            private String type;
            private Coordinates coordinates;

            // Getters e Setters
            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }

            public Coordinates getCoordinates() {
                return coordinates;
            }

            public void setCoordinates(Coordinates coordinates) {
                this.coordinates = coordinates;
            }

            // Classe interna para representar "coordinates"
            public static class Coordinates {
                private String longitude;
                private String latitude;

                // Getters e Setters
                public String getLongitude() {
                    return longitude;
                }

                public void setLongitude(String longitude) {
                    this.longitude = longitude;
                }

                public String getLatitude() {
                    return latitude;
                }

                public void setLatitude(String latitude) {
                    this.latitude = latitude;
                }
            }
        }
    }
}
