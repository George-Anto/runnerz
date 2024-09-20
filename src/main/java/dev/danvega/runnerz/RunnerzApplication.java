package dev.danvega.runnerz;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class RunnerzApplication {

	public static void main(String[] args) {
		SpringApplication.run(RunnerzApplication.class, args);

		log.info("The application works!");
	}

//	@Bean
//	CommandLineRunner runner() {
//		return args -> {
//			Run run = new Run(1,
//					"First Run",
//					LocalDateTime.now(),
//					LocalDateTime.now().plus(1, ChronoUnit.HOURS),
//					5,
//					Location.OUTDOOR);
//			log.info("My run: {}", run);
//		};
//	}
}
