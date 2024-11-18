package API_GREENTCH.relatorios.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import API_GREENTCH.login.repositories.EnderecoRepository;;

@Service
public class AreasMaisAcessadasService {
    @Autowired
    private EnderecoRepository enderecoRepository;
    
    public Map<String, Object>getAreasMaisAcessadas() {
        Map<String, Object> response = new HashMap<>();

        // Estados
        List<Object[]> estadosMaisAcessados = enderecoRepository.findEstadosMaisAcessadosComCoordenadas();
        List<Map<String, Object>> estados = new ArrayList<>();
        for (Object[] row : estadosMaisAcessados) {
            Map<String, Object> estadoInfo = new HashMap<>();
            estadoInfo.put("name", row[0]);
            estadoInfo.put("accesses", row[1]);
            estadoInfo.put("latitude", row[2]);
            estadoInfo.put("longitude", row[3]);
            estados.add(estadoInfo);
        }

        // Cidades
        List<Object[]> cidadesMaisAcessadas = enderecoRepository.findCidadesMaisAcessadasComCoordenadas();
        List<Map<String, Object>> cidades = new ArrayList<>();
        for (Object[] row : cidadesMaisAcessadas) {
            Map<String, Object> cidadeInfo = new HashMap<>();
            cidadeInfo.put("name", row[0]);
            cidadeInfo.put("accesses", row[1]);
            cidadeInfo.put("latitude", row[2]);
            cidadeInfo.put("longitude", row[3]);
            cidades.add(cidadeInfo);
        }

        response.put("estados", estados);
        response.put("cidades", cidades);

        return response;
    }
}
