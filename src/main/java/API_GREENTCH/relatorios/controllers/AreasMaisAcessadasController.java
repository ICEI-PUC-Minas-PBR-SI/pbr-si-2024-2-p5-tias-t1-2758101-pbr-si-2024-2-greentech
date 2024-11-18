package API_GREENTCH.relatorios.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import API_GREENTCH.relatorios.service.AreasMaisAcessadasService;


@RestController
@RequestMapping("/relatorio")
public class AreasMaisAcessadasController {
	
	@Autowired
	private AreasMaisAcessadasService service;
	
	@GetMapping(value ="/mais-acessados", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> findById(Map<String, Object> body) {
		return service.getAreasMaisAcessadas();
	}

}
