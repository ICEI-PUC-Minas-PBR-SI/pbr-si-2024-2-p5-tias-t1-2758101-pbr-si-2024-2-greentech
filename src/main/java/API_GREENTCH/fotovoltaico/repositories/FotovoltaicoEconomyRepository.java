package API_GREENTCH.fotovoltaico.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import API_GREENTCH.models.FotovoltaicoEconomy;

@Repository
public interface FotovoltaicoEconomyRepository extends JpaRepository<FotovoltaicoEconomy, Long> {}
