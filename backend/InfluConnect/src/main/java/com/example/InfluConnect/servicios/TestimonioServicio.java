package com.example.InfluConnect.servicios;

import com.example.InfluConnect.modelos.Testimonio;
import com.example.InfluConnect.repositorios.ITestimonioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestimonioServicio {

    @Autowired
    private ITestimonioRepositorio testimonioRepositorio;

    public List<Testimonio> listarTodos() {
        return testimonioRepositorio.findAll();
    }

    public Optional<Testimonio> obtenerPorId(Long id) {
        return testimonioRepositorio.findById(id);
    }

    public Testimonio crear(Testimonio testimonio) {
        return testimonioRepositorio.save(testimonio);
    }

    public Optional<Testimonio> actualizar(Long id, Testimonio datosNuevos) {
        return testimonioRepositorio.findById(id).map(testimonio -> {
            testimonio.setNombreCliente(datosNuevos.getNombreCliente());
            testimonio.setMensaje(datosNuevos.getMensaje());
            testimonio.setCalificacion(datosNuevos.getCalificacion());
            testimonio.setFecha(datosNuevos.getFecha());
            testimonio.setAprobado(datosNuevos.getAprobado());
            return testimonioRepositorio.save(testimonio);
        });
    }

    public boolean eliminar(Long id) {
        if (testimonioRepositorio.existsById(id)) {
            testimonioRepositorio.deleteById(id);
            return true;
        }
        return false;
    }
}

