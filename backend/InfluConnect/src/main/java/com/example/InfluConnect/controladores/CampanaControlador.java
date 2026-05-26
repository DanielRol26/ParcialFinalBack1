package com.example.InfluConnect.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.InfluConnect.modelos.Campana;
import com.example.InfluConnect.servicios.CampanaServicio;

@RestController
@RequestMapping("/api/v1/campanas")
public class CampanaControlador {

    @Autowired
    private CampanaServicio campanaServicio;

    @PostMapping
    public ResponseEntity<?> controlarGuardado(@RequestBody Campana datos){
        return ResponseEntity.status(HttpStatus.OK).body(campanaServicio.guardarCampana(datos));
    }

    @GetMapping
    public ResponseEntity<?> controlarListado(){
        return ResponseEntity.status(HttpStatus.OK).body(campanaServicio.obtenerCampanas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> controlarConsultaPorId(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(campanaServicio.buscarCampanaPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> controlarActualizacion(@PathVariable Long id, @RequestBody Campana datos){
        return ResponseEntity.status(HttpStatus.OK).body(campanaServicio.actualizarCampana(id, datos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> controlarEliminacion(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(campanaServicio.eliminarCampana(id));
    }
}
