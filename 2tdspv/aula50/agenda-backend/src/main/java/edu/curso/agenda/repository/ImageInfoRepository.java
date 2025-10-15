package edu.curso.agenda.repository;

import edu.curso.agenda.model.ImageInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageInfoRepository extends JpaRepository<ImageInfo, Long> {
    @Query("Select i From ImageInfo i Where i.titulo like %:titulo%")
    List<ImageInfo> pesquisarPorTitulo(@Param("titulo") String titulo);
}
