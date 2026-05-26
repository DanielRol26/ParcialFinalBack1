package com.example.InfluConnect.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.InfluConnect.modelos.Campana;
import com.example.InfluConnect.repositorios.ICampanaRepositorio;

@Service
public class CampanaServicio {

    @Autowired
    private ICampanaRepositorio campanaRepositorio;

    // POST
    // Guardar un registro en la tabla campanas
    public Campana guardarCampana(Campana campana) {
        Campana campanaGuardada = campanaRepositorio.save(campana);
        return campanaGuardada;
    }

    // GET
    // Buscar todos los registros de la tabla
    public List<Campana> obtenerCampanas() {
        List<Campana> campanas = campanaRepositorio.findAll();
        return campanas;
    }

    // GET
    // Buscar un registro por su id
    public Campana buscarCampanaPorId(Long id) {
        Optional<Campana> campanaBuscada = campanaRepositorio.findById(id);
        if (campanaBuscada.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La campaña que buscas no existe en la BD");
        }
        return campanaBuscada.get();
    }

    // PUT
    // Actualizar un registro por id
    public Campana actualizarCampana(Long id, Campana campana) {
        Optional<Campana> campanaBuscada = campanaRepositorio.findById(id);
        if (campanaBuscada.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La campaña que buscas no existe en la BD");
        }
        Campana campanaEncontradaEnLaBD = campanaRepositorio.save(campana);
        campanaEncontradaEnLaBD.setNombre(campana.getNombre());
        campanaEncontradaEnLaBD.setDescripcion(campana.getDescripcion());
        return campanaRepositorio.save(campanaEncontradaEnLaBD);
    }

    // DELETE
    // Eliminar un registro por id
    public Boolean eliminarCampana(Long id) {
        Optional<Campana> campanaBuscada = campanaRepositorio.findById(id);
        if (campanaBuscada.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "La campaña que buscas no existe en la BD");
        }
        campanaRepositorio.deleteById(id);
        return true;
    }
}
