import React from "react";

export default class Prod extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            mainfoto:this.props.listafirst
        }
        /*this.Mf = props.listafirst 
        this.images = props.listrest*/


    }

    Change = (e) => {
        this.setState({
            mainfoto:e.target.src
        })
    }

    
    
    render() {
        console.log(this.props.listrest[1],'=',this.state.mainfoto,':',this.props.listrest[1]==this.state.mainfoto)
        if (this.props.listafirst!=this.state.mainfoto && this.props.listrest[0]!=this.state.mainfoto && this.props.listrest[1]!=this.state.mainfoto && this.props.listrest[2]!=this.state.mainfoto && this.props.listrest[3]!=this.state.mainfoto && this.props.listrest[4]!=this.state.mainfoto){
            this.setState({mainfoto:this.props.listafirst})
        }
        return (

            <section style={{ paddingTop: '140px', display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                <img src={this.state.mainfoto} alt="principal" height={'400px'} />
                <div style={{ margin: '30px' }}>
                    <h3>Outras fotos</h3>
                    <div style={{ border: '1px solid black' }}>

                        {this.props.listrest.map((image, ind) => {
                            return (
                                <img key={ind} className="clicavel" src={image} alt={`image-${ind}`} height={'100px'} onClick={(e) => { this.Change(e) }} />
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

/*
<div>
                    {this.images.map((img, index) => {
                        return (
                            <img src={img} alt={`imagem-${index}`} />
                        )
                    })}
                </div> 
*/