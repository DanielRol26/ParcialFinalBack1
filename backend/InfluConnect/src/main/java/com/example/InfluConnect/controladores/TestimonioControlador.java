package com.example.InfluConnect.controladores;

import com.example.InfluConnect.modelos.Testimonio;
import com.example.InfluConnect.servicios.TestimonioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonios")
@CrossOrigin(origins = "*")
public class TestimonioControlador {

    @Autowired
    private TestimonioServicio testimonioServicio;

    @GetMapping
    public ResponseEntity<List<Testimonio>> listarTodos() {
        return ResponseEntity.ok(testimonioServicio.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Testimonio> obtenerPorId(@PathVariable Long id) {
        return testimonioServicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Testimonio> crear(@RequestBody Testimonio testimonio) {
        return ResponseEntity.status(HttpStatus.CREATED).body(testimonioServicio.crear(testimonio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonio> actualizar(@PathVariable Long id, @RequestBody Testimonio testimonio) {
        return testimonioServicio.actualizar(id, testimonio)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (testimonioServicio.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
