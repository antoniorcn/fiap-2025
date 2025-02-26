type Motor = 1.0 | 1.3 | 1.4 | 1.5 | 1.6 | 1.8 | 2.0 | 2.1 | 2.2;

enum Combustivel { 
    DIESEL,
    GASOLINA,
    ETANOL,
    GNV,
    FLEX,
    ELETRICO,
    HIBRIDO,
    HYDROGENIO_VERDE
}

enum Horario { 
    MANHA,
    TARDE,
    NOITE
}

let m : Motor = 1.0

interface Carro { 
    marca : string;
    modelo : string;
    ano : number;
    chassi : string;
    motor : Motor;
    placa : string;
    combustivel : Combustivel;
    autonomia : number;
}

interface Produto { 
    ean13? : string;
    nome : string; 
    fabricante : string;
    valor : number;
}

interface Endereco { 
    logradouro : string;
    numero : number;
    complemento : string;
    bairro : string;
    cidade : string;
    estado : string;
    cep : string;
}

interface Telefone { 
    codigoArea : string;
    numero : string;
    operadora : "Vivo" | "Tim" | "Claro" | "Oi" | "Inter" | "PortoSeguro";
    horario : Horario;
}

interface TimeFutebol { 
    nome : string,
    fundacao : Date,
    estadio : string,
    local : Endereco,
    ct : Endereco
}