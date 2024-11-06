package API_GREENTCH.pluvial.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import API_GREENTCH.pluvial.service.PluvialService;

@RestController
@RequestMapping("/pluvial")
public class PluvialController {
	@Autowired
	private PluvialService service;

    @PostMapping(value ="endereco/{id}/{area}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, Object> create(@PathVariable(value = "id")Long id,  @PathVariable(value = "area")int area) {
		return service.calculate(id,area);
	}
}
