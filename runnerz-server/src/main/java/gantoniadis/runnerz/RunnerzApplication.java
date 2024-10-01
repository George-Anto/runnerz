package gantoniadis.runnerz;

import gantoniadis.runnerz.userFromAPI.UserFromAPI;
import gantoniadis.runnerz.userFromAPI.UserFromAPIHttpClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;


@Slf4j
@SpringBootApplication
public class RunnerzApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(RunnerzApplication.class);
	}

	public static void main(String[] args) throws UnknownHostException {
		ConfigurableApplicationContext context =SpringApplication.run(RunnerzApplication.class, args);

		log.info("Spring Boot Server is up! Running at http://{}:{}",
				InetAddress.getLocalHost().getHostAddress(),
				context.getEnvironment().getProperty("server.port"));
	}

	@Bean
	UserFromAPIHttpClient userHttpClient() {
		RestClient restClient = RestClient.create("https://jsonplaceholder.typicode.com/");
		HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(RestClientAdapter.create(restClient)).build();
		return factory.createClient(UserFromAPIHttpClient.class);
	}

	@Bean
	CommandLineRunner runner(UserFromAPIHttpClient userFromAPIHttpClient) {
		return args -> {
			List<UserFromAPI> usersFromAPI = userFromAPIHttpClient.findAll();
			log.info("Users from API: {}", usersFromAPI);

			var user1 = userFromAPIHttpClient.findById(1);
			log.info("User 1 from API: {}", user1);
		};
	}
}
