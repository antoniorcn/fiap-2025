import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.stream.Collectors;
class Teste { 

    public static void main(String args[]) { 
        List<String> nomes = Arrays.asList("Joao", "Maria", "Alberto", "Jose");
        // for (int i = 0; i < nomes.size(); i++) {
        //     System.out.println( nomes.get(i) );
        // }
        // System.out.println("Metodo 2");
        // for (String item : nomes) { 
        //     System.out.println( item );
        // }
        // System.out.println("Metodo 4");
        // nomes.stream().forEach( item -> System.out.println( item ) );

        // System.out.println("Metodo 6");
        // nomes.stream().forEach( System.out::println );

        // ArrayList<String> nomesMaiusculo  = new ArrayList<>();
        // for (String item : nomes) { 
        //     nomesMaiusculo.add( item.toUpperCase());
        // }
        // System.out.println("Metodo 5");
        // nomesMaiusculo.stream().forEach( item -> System.out.println( item ) );


        // System.out.println("Metodo 7");
        // List<String> nomesMaiusculo = nomes
        // .stream()
        // .map( item -> item.toUpperCase() )
        // .collect(Collectors.toList());
        // nomesMaiusculo.stream().forEach( item -> System.out.println( item ) );

        System.out.println("Metodo 8");
        nomes.stream().map( item -> item.toUpperCase() ).forEach( System.out::println );
    }

    // public void iterar( String item ) { 
        
    // }

}
