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
    private static final String AWESOME_API_URL = "https://cep.awesomeapi.com.br/json/";

    public Endereco salvarEndereco(Endereco endereco) {
        if (endereco.getCep() != null) {
            String url = AWESOME_API_URL + endereco.getCep();

            try {
                // Faz a chamada à API e mapeia a resposta
                CepResponse cepResponse = restTemplate.getForObject(url, CepResponse.class);

                if (cepResponse != null) {
                    // Configura os campos do Endereco com base na resposta da API
                    endereco.setLatitude((float) cepResponse.getLat());
                    endereco.setLongitude((float) cepResponse.getLng());
                }
            } catch (Exception e) {
                System.err.println("Erro ao buscar coordenadas para o CEP: " + e.getMessage());
            }
        }

        return enderecoRepository.save(endereco);
    }

    // Classe para mapear a resposta da API
    public static class CepResponse {
        private String cep;
        private String state;
        private String city;
        private String district;
        private String addressName; // Mapeado para 'address_name'
        private double lng; // Usando double para mais precisão
        private double lat; // Usando double para mais precisão

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

        public String getDistrict() {
            return district;
        }

        public void setDistrict(String district) {
            this.district = district;
        }

        public String getAddressName() {
            return addressName;
        }

        public void setAddressName(String addressName) {
            this.addressName = addressName;
        }

        public double getLng() {
            return lng;
        }

        public void setLng(double lng) {
            this.lng = lng;
        }

        public double getLat() {
            return lat;
        }

        public void setLat(double lat) {
            this.lat = lat;
        }
    }

    public Optional<Endereco> getEndereco(Long id) {
        return enderecoRepository.findById(id);
    }
}