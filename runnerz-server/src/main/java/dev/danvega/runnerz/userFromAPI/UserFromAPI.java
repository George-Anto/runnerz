package dev.danvega.runnerz.userFromAPI;

public record UserFromAPI(
        Integer id,
        String name,
        String username,
        String email,
        Address address,
        String phone,
        String website,
        Company company
) { }
