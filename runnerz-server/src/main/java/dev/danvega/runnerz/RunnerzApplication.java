package dev.danvega.runnerz;

import dev.danvega.runnerz.user.User;
import dev.danvega.runnerz.user.UserHttpClient;
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
	UserHttpClient userHttpClient() {
		RestClient restClient = RestClient.create("https://jsonplaceholder.typicode.com/");
		HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(RestClientAdapter.create(restClient)).build();
		return factory.createClient(UserHttpClient.class);
	}

	@Bean
	CommandLineRunner runner(UserHttpClient userClient) {
		return args -> {
			List<User> users = userClient.findAll();
			log.info("Users: {}", users);

			var user1 = userClient.findById(1);
			log.info("User 1: {}", user1);
		};
	}
}
