type ResolveFn<T> = (value: T | PromiseLike<T>) => void;
type RejectFn = (reason?: unknown) => void;
const esperar = (tempo: number): Promise<string> => {
  return new Promise<string>(
	(resolve: ResolveFn<string>, 
	reject: RejectFn) => {
	if (tempo < 0) {
      	reject("Tempo inválido!");
      	return;
	}
	setTimeout(() => {	
		const sucesso: boolean = Math.random() > 0.5;
		if (sucesso) {  
			resolve(`Deu certo! O numero foi gerado em ${tempo}ms`);
  		} else {
		    reject(new Error("Algo deu errado!"));
		}
	}, tempo);
  });
};

console.log( "Iniciado aguardando ...");
esperar( 1000 )
.then( ( dados : string )=> {
    console.log("Sucesso");
    console.log(dados);
 } )
.catch(( erro : unknown ) => { 
    console.log("Falha");
    console.log(erro);
})
.finally( () => { 
	console.log("finalizado...");
})
