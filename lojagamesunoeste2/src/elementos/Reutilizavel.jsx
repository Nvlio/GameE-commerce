

//focado no tratamento de elementos de formulario
export default function Elem(props) {
    function ChangeHandle(event) {
      props.onChange(props.name, event.target.value);
    }
  
    function keyPress(event){
      if(props.tipo==="pesquisar" || props.tipo==="enviar"){
        props.onKeyDown(event.key)
      }
      
    }

    if (props.fun === "Inp") {
      return (
        <div key={"sla"}>
          <label>
            <font>
              <font>{props.font}</font>
            </font>
            <br />
          </label>
          <input
            onChange={ChangeHandle}
            onKeyDown={keyPress}
            name={props.name}
            type={props.type}
            className="form-control"
            id="exampleInputPassword1"
            placeholder={props.place}
            maxLength={props.length}
            required
          ></input>
        </div>
      );
    } else if (props.fun === "Sel") {
      return (
        <div key={"nsei"}>
          <label>{props.Lista[0]}</label>
          <br />
          <br />
          <select onChange={ChangeHandle}>
            <option value={"18-20"}>{props.Lista[1]}</option>
            <option value={"20-25"}>{props.Lista[2]}</option>
            <option value={"25-30"}>{props.Lista[3]}</option>
            <option value={"30>"}>{props.Lista[4]}</option>
          </select>
        </div>
      );
    } else if (props.fun === "Check") {
      let inp = [];
  
      for (let i = 1; i <= props.Lista[2]; i++) {
        inp.push(
          <div key={"haha"}>
            <label>
              <font>
                <font>{props.Lista[i + 2]}</font>
              </font>
              <input
                type={props.Lista[1]}
                name="optionsRadios"
                value={`option${i}`}
                required
                onChange={ChangeHandle}
              />
            </label>
          </div>
        );
      }
  
      return (
        <fieldset key={"agora"} className="Check">
          <legend>
            <font style={{ fontSize: "15px" }}>
              <font>{props.Lista[0]}</font>
            </font>
          </legend>
          {inp}
          <br />
        </fieldset>
      );
    } else if (props.fun === "But") {
      return (
        <button
          type={props.type}
          style={{
            backgroundColor: props.cor,
            color: "white",
            borderRadius: "10px",
            fontSize: "30px",
            margin: "10px",
          }}
        >
          {props.text}
        </button>
      );
    } else {
      return (
        <div key={"chega"}>
          <br />
          <label htmlFor="foto">{Image}</label>
          <br />
          <input
            onChange={ChangeHandle}
            type={props.type}
            id="imagem"
            name={props.name}
            accept="image/*"
            required
          />
          <br />
          <br />
        </div>
      );
    }
  }
