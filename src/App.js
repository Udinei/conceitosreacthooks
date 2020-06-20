// Esse arquivo trata do uso de Hooks do React, que substitui
// nas funções os metodos do ciclo de vida, encotrados somente nas classes

// useState - permite a criação e utilizacao de estado em funcões
// useEffect - sobrepoes os metodos do ciclo de vida didMount, didUpdate, didWillMount
// useMemo - utilizado para calculos com base em alterações de variaveis e outros
// useCallBack - semelhando ao useMemo, mas retorna uma funcao em de um unico valor
import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
    // criando state tech - para tipo de componente na tela,
    // deve-se criar um useState
    // desestruturando - tech terá a lista do state,
    // e setTech e a funcao que vai manipular o state tech
    const [tech, setTech] = useState([]);
    const [newTech, setNewTech] = useState('')

    // function handleAdd - sem uso de callBack que evita a funcao ser criada toda vez que
    // um elemento é adicionado
    /*function handleAdd(){
        // copiando todo state ...tech e adiconando no final Node.js
        setTech([...tech, newTech]);
        setNewTech('');
    }*/

    // function handleAdd - com uso de callBack
    // essa funcao somente sera recriada se as
    // variaveis tech ou newTech forem alteradas
    const handleAdd = useCallback(() => {
        // copiando todo state ...tech e adicionando no final Node.js
        setTech([...tech, newTech]);
        setNewTech('');
    },[newTech, tech]);

    // Esse useEffect com array vazio(array de dependencias) executa somente a vez
    // que for instanciado, ao iniciar carrega dados do local storage
    // simulando um component DidMount
    useEffect(() => {
         const storageTech = localStorage.getItem('tech');

         if(storageTech){
             setTech(JSON.parse(storageTech));
         }

         // se retorn uma funcao simula o componente WillMount
         // executa a funcao ao sair do useEffect
         // return () => {
             // remove event listner acima adicionado
             // document.removeEventListener();
         //};

    },[]);


    // Esse useEffect monitora uma variavel ou varias e executa sempre que
    // for alterada(sempre executa na primeira vez que instanciar)
    // param1 - codigo da funcao que e disaparada
    // param2 - array de variaveis observadas(array de dependencias)
    // simulando um component DidUpdate
    useEffect(() => {
        localStorage.setItem('tech', JSON.stringify(tech))
    },[tech]);

    // obtem o tamanho do array tech e coloca em techSize
    // altera techSize somente se tech tiver um novo valor para mais ou menos
    const techSize = useMemo(() => tech.length, [tech]);

    // sera redenrizado todas vez que tech for alterado
    return (
        <>
            <ul>
                { tech.map(t => (
                    <li key={ t }>{ t }</li>
                )) }
            </ul>
                <strong>Você tem {techSize} Tecnologias</strong>
                <br />
            <input value={newTech} onChange={e => setNewTech(e.target.value)} />
            <button type="button" onClick={handleAdd}>Adicionar</button>
        </>
    );
}

export default App;
