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
        System.out.println("Entrou");
        if (endereco.getCep() != null) {
            System.out.println(AWESOME_API_URL);
            // Constrói a URL da API com o CEP
            String url = AWESOME_API_URL + endereco.getCep();
            System.out.println(url);

            // Faz a chamada à API e mapeia a resposta
            try {
                CepResponse cepResponse = restTemplate.getForObject(url, CepResponse.class);
                if (cepResponse != null) {
                    // Configura os campos do Endereco com base na resposta da AwesomeAPI
                    endereco.setLatitude(cepResponse.getLat());
                    endereco.setLongitude(cepResponse.getLng());
                    endereco.setCidade(cepResponse.getCity());
                    endereco.setEstado(cepResponse.getState());
                    endereco.setLogradouro(cepResponse.getAddressName());
                }
            } catch (Exception e) {
                System.err.println("Erro ao buscar coordenadas para o CEP: " + e.getMessage());
            }
        }

        return enderecoRepository.save(endereco);
    }

    public Optional<Endereco> getEndereco(Long id) {
        return enderecoRepository.findById(id);
    }

    // Classe para mapear a resposta da AwesomeAPI
    public static class CepResponse {
        private String cep;
        private String state;
        private String city;
        private String district;
        private String addressName;
        private float lng;
        private float lat;

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

        public float getLng() {
            return lng;
        }

        public void setLng(float lng) {
            this.lng = lng;
        }

        public float getLat() {
            return lat;
        }

        public void setLat(float lat) {
            this.lat = lat;
        }
    }
}
