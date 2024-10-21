package API_GREENTCH.fotovoltaico.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import API_GREENTCH.fotovoltaico.services.FotovoltaicoService;

@RestController
@RequestMapping("/fotovoltaico")
public class FotovoltaicoController {
	@Autowired
	private FotovoltaicoService service;

    @RequestMapping(value ="/calc-economy", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> create(@RequestBody Map<String, Object> body) {
		return service.calculateEconomy(body);
	}
}
