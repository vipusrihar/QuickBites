package com.vipusa.onlineFood.repository;

import com.vipusa.onlineFood.model.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
    Optional<Favorites> findByUserId(Long userId);
}
