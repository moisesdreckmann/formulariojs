import './App.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

function App() {

  const schema = Yup.object().shape({
    nome: Yup.string().required('O campo nome é obrigatório.'),
    cpf: Yup.string().required('O campo cpf é obrigatório'),
    email: Yup.string().required('O campo email é obrigatório'),
    login: Yup.string().required('O campo login é obrigatório'),
    senha: Yup.string().min(8,'a senha precisa ter 8 caracteres').required('O campo senha é obrigatório'),
    ConfirmaSenha: Yup.string().min(8,'a senha precisa ter 8 caracteres').oneOf([Yup.ref('senha'), null], 'As senhas precisam ser iguais').required('Confirme sua senha')
  })

  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit', 
    resolver: yupResolver(schema)})

  const {errors} = formState

  const handleSubmitData = (data) => {
    //console.log(data)
    //dados para serem consumidos por api
    reset()
    alert('formulário enviado com sucesso!')
    return data
  }

  const validarNumeros = (event) => {
    if(event.keyCode  < 48 || event.keyCode  > 57){
      if(event.key != 'Backspace') {
        event.preventDefault() 
      }
    }
  }

  const mascaracpf = (event) => {
    const input = event.target
    let value = input.value.replace(/\D/g, '') // Remove caracteres não numéricos
  
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3')
    } else if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4')
    }
  
    input.value = value
  }

  return (
    <>
      <main>
        <form action="" method="post" className="formulario" autoComplete="off" onSubmit={handleSubmit(handleSubmitData)}>
          <fieldset>
            <legend>Account</legend>
            <div>
              <input 
                {...register('nome')}
                name="nome"
                type="text"
                maxLength="20"
                placeholder="Digite o Seu Nome"
                className={errors.nome ? 'campos error' : 'campos'}
              />
              {errors.nome && <span className='span'>{errors.nome.message}</span>}
            </div>

            <div>
              <input 
                {...register('cpf', { pattern: /^[0-9]{11}$/ })} 
                name="cpf"
                type="text"
                maxLength="14"
                placeholder="Digite o Seu Cpf"
                className={errors.cpf ? 'campos error' : 'campos'}
                onKeyDown={(event) => {
                  validarNumeros(event)
                  mascaracpf(event)
                }}
              />
              {errors.cpf && <span className='span'>{errors.cpf.message}</span>}
            </div>

            <div>
              <input 
                {...register('email', { pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ })} 
                name="email"
                type="email"
                maxLength="30"
                placeholder="Digite o Seu E-mail"
                className={errors.email ? 'campos error' : 'campos'}
              />
              {errors.email && <span className='span'>{errors.email.message}</span>}
            </div>

            <div>
              <input 
                {...register('login')}
                name="login"
                type="text"
                maxLength="20"
                placeholder="Digite o Seu Login"
                className={errors.login ? 'campos error' : 'campos'}
              />
              {errors.login && <span className='span'>{errors.login.message}</span>}
            </div>

            <div>
              <input 
                {...register('senha', { pattern: /^[0-9]{8}$/ })} 
                name="senha"
                type="password"
                maxLength="8"
                placeholder="Digite a Sua Senha"
                className={errors.senha ? 'campos error' : 'campos'}
                onKeyDown={validarNumeros}
              />
              {errors.senha && <span className='span'>{errors.senha.message}</span>}
            </div>

            <div>
              <input 
                  {...register('ConfirmaSenha', { pattern: /^[0-9]{8}$/ })} 
                  name="ConfirmaSenha"
                  type="password"
                  maxLength="8"
                  placeholder="Confirme sua Senha"
                  className={errors.ConfirmaSenha ? 'campos error' : 'campos'}
                  onKeyDown={validarNumeros}
                />
                {errors.ConfirmaSenha && <span className='span'>{errors.ConfirmaSenha.message}</span>}
            </div>

            <button type="submit" className="btn00">Enviar</button>
          </fieldset>
        </form>
      </main>
    </>
  )
}

export default App;
