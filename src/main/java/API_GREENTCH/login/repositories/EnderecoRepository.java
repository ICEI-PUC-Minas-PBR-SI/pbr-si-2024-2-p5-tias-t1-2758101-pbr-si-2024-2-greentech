package API_GREENTCH.login.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import API_GREENTCH.models.Endereco;
import API_GREENTCH.models.Person;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>  {

    Optional<Endereco> findByCep(String cep);

    @Query("SELECT e.estado, COUNT(e), MIN(e.latitude), MIN(e.longitude) " +
           "FROM Endereco e GROUP BY e.estado ORDER BY COUNT(e) DESC")
    List<Object[]> findEstadosMaisAcessadosComCoordenadas();

    @Query("SELECT e.cidade, COUNT(e), MIN(e.latitude), MIN(e.longitude) " +
           "FROM Endereco e GROUP BY e.cidade ORDER BY COUNT(e) DESC")
    List<Object[]> findCidadesMaisAcessadasComCoordenadas();
}
