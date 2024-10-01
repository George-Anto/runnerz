package gantoniadis.runnerz.userFromAPI;

public record Address(
        String street,
        String suite,
        String city,
        String zipcode,
        Geo geo
) { }
