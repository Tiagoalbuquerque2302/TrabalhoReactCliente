import React from "react";
import Icon from 'material-ui/Icon';
import Button  from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from 'material-ui/Table';


export default class SolicitacaoListaLista extends React.Component {

    setPagina(numero) {
        this.props.mudaPagina(numero);
    }

    botoesPagina() {
        let botoes = [<button>&lt;&lt;</button>, <button>&lt;</button>];
        for (let x = 0; x < this.props.pagina.totalPages; x++) {
            let botao = <button 
                onClick={(evento) => {
                                this.setPagina(x);
            }}
                disabled={x == this.props.pagina.number}>{x + 1}</button>;
                botoes.push(botao);
        }
        return botoes;
    }

    botoesSolicitacao(solicitacao) {
        let botoes = [];
        if (this.props.editar) {
            let botao = <Button raised style={{backgroundColor: '#0097A7', color: 'white', fontWeight: 'bold', margin: '2px'}} onClick={(evento) => {
                    
                                solicitacao.status="Aceito";
                                this.props.editar(solicitacao.id, solicitacao);
            }} color="secondary">
        Aceitar
      </Button>
     
                            /*
                            <button onClick={(evento) => {
                                this.props.editar(solicitacao);
            }}>
                Editar</button>;*/;
                botoes.push(botao);
        }
        
        if (this.props.editar) {
            let botao = 
                    <Button raised style={{backgroundColor: '#D50000', color: 'white', fontWeight: 'bold', margin: '2px'}} onClick={(evento) => {
                                
                                solicitacao.status="Recusado";
                                this.props.editar(solicitacao.id, solicitacao);
            }} color="secondary">
        Recusar
      </Button>
                    /*            
                                
                                <button onClick={(evento) => {
                                this.props.apagar(solicitacao);
            }}>
                Apagar</button>;*/
                botoes.push(botao);
        }

        
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Vazio!</div>;
        } else {

            return <Table >
    <TableHead>
    <h1 style={{textAlign: 'center'}}>SOLICITACOES</h1>
        <TableRow>
            <TableCell>Endereco Busca</TableCell><TableCell>Endereco Entrega</TableCell><TableCell>Distancia</TableCell><TableCell>Tempo</TableCell><TableCell>Custo</TableCell><TableCell>Status</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
    
        {this.props.pagina.content.map((solicitacao) => {
            
                                if (solicitacao.status!="Aceito"&&solicitacao.status!="Recusado")
                                return <TableRow hover="true" key={solicitacao.id}>
                            <TableCell>{solicitacao.enderecobusca}</TableCell>
                            <TableCell>{solicitacao.enderecoentrega}</TableCell>       
                            <TableCell>{solicitacao.distancia}</TableCell>
                            <TableCell>{solicitacao.tempo}</TableCell>
                            <TableCell>{solicitacao.custo}</TableCell> 
                            <TableCell>{solicitacao.status}</TableCell>
                            <TableCell>
                                {this.botoesSolicitacao(solicitacao)}</TableCell>
                        </TableRow>;
        })}        
    </TableBody>
    <TableFooter>
        <TableRow>
        <TablePagination
                  count={this.props.pagina.totalElements}
                  rowsPerPage={this.props.pagina.size}
                  page={this.props.pagina.number}
                  onChangePage={(evento,pagina)=>{this.setPagina(pagina);}}
                  onChangeRowsPerPage={()=>{}}
                  rowsPerPageOptions={[this.props.pagina.size]}
                  labelRowsPerPage=""
                />
        </TableRow>                        
    </TableFooter>
</Table>;
        }
    }
}