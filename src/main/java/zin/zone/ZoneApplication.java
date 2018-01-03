package zin.zone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import zin.zone.configuration.JpaConfiguration;


@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages={"zin.zone"})// same as @Configuration @EnableAutoConfiguration @ComponentScan
public class ZoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZoneApplication.class, args);
	}
}