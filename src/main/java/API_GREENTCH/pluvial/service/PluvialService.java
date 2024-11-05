package API_GREENTCH.pluvial.service;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import API_GREENTCH.exceptions.ResourceNotFoundException;
import API_GREENTCH.login.repositories.EnderecoRepository;
import API_GREENTCH.login.repositories.PersonRepository;
import API_GREENTCH.login.services.EnderecoService;
import API_GREENTCH.models.Endereco;
import API_GREENTCH.models.WeatherData;
import API_GREENTCH.pluvial.repository.PluvialEconomyRepository;

@Service
public class PluvialService {

    @Autowired
    private PluvialEconomyRepository pluvialRepository;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private WeatherService aWeatherService;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OPEN_METEO_API_URL = "https://archive-api.open-meteo.com/v1/archive";

    public Map<String, Object> calculate(Long id, int area) {

        Optional<Endereco> endereco = enderecoService.getEndereco(id);

        // Verifica se o endereço existe e lança exceção se estiver vazio
        Endereco enderecoEncontrado = endereco
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));

        WeatherData resp = aWeatherService.createApi(enderecoEncontrado.getLatitude(), enderecoEncontrado.getLongitude());

        throw new UnsupportedOperationException("Método 'calculate' ainda não foi implementado");
    }
}
