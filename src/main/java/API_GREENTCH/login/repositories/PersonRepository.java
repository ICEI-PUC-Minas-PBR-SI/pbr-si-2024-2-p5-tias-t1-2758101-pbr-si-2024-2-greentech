package API_GREENTCH.login.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import API_GREENTCH.models.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {}
