package API_GREENTCH.login.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import API_GREENTCH.models.Endereco;
import API_GREENTCH.models.Person;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>  {

    Optional<Endereco> findByCep(String cep);


}
