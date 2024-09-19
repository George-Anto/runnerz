package dev.danvega.runnerz;

import dev.danvega.runnerz.run.Location;
import dev.danvega.runnerz.run.Run;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Slf4j
@SpringBootApplication
public class RunnerzApplication {

	public static void main(String[] args) {
		SpringApplication.run(RunnerzApplication.class, args);

		log.info("The application works!");
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			Run run = new Run(1,
					"First Run",
					LocalDateTime.now(),
					LocalDateTime.now().plus(1, ChronoUnit.HOURS),
					5,
					Location.OUTDOOR);
			log.info("My run: {}", run);
		};
	}
}
