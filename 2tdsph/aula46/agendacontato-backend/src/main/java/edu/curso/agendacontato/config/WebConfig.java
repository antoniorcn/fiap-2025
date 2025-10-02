//package edu.curso.agendacontato.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import java.nio.file.Paths;
//
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    private final String IMAGE_PATH = "D:\\AntonioMAD\\images";
//
//    @Override
//    public void addResourceHandlers( ResourceHandlerRegistry registry ) {
//        String uploadPath = Paths.get( IMAGE_PATH ).toAbsolutePath().toString();
//        registry.addResourceHandler("/uploads/**")
//        .addResourceLocations("file:$uploadPath/");
//    }
//}