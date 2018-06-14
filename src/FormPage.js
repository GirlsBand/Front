import React, {Component} from 'react';
import {withRouter} from 'react-router'
import PropTypes from 'prop-types';
import axios from 'axios';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import  './FormPage.css';

const keys = ['region', 'city', 'people', 'work', 'pets', 'study'];


class FormPage extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    state={
        accessToken: '',
        region: '',
        city: '',
        people: 1,
        work: '',
        pets: '',
        study: '',
        validation:{},
        onWorkError: true,
        onStudyError: true,
        isValid:true,

        questions: [
            {
                title: 'What do you prefer',
                type: 'checkbox',
                name:'region',
                answers: ['City','Countryside'],
            },
            {
                title: 'Clarify the city to live',
                type: 'select',
                name:'city',
                answers: ['San Francisco','San Diego']
            },
            {
                title: 'How many people are in your family',
                name: 'people',
                type: 'number'
            },
            {
                title: 'Specify place of work',
                name: 'work',
                type: 'text'
            },
            {
                title: ' Specify place of study',
                name: 'study',
                type: 'text'
            },
            {
                title: ' Do you have pets to walk',
                name: 'pets',
                type: 'select',
                answers: ['Yes','No']
            }
        ]
    }
    componentDidMount(){
        const {history} = this.props;
        window.scrollTo(0, 0)
        if (this.props.location.state===undefined){
            history.push('/')
            return
        }
        this.setState({accessToken:this.props.location.state.token})
    }
    validateInputs = () => {
        let { study, work } = this.state;
        study = study.split(',');
        work = work.split(',');

        if (study.length !==2 || work.length !==2) {
            return Promise.reject();
        }
        const url = 'https://nominatim.openstreetmap.org/search';
        let streetStudy = ``;
        let cityStudy = ``;
        study[0].split(' ').forEach(item => streetStudy=streetStudy+`+${item}`)
        study[1].split(' ').forEach(item => cityStudy=cityStudy+`+${item}`)
        let streetWork = ``;
        let cityWork = ``;
        work[0].split(' ').forEach(item => streetWork+=`+${item}`)
        work[1].split(' ').forEach(item => cityWork+=`+${item}`)
        return Promise.all([
            axios.get(`${url}?q=${streetStudy},${cityStudy}&format=json&polygon=1&addressdetails=1`),
            axios.get(`${url}?q=${streetWork},${cityWork}&format=json&polygon=1&addressdetails=1`)
        ])
    }

    onSubmitCLick = () => {
        const { accessToken } = this.state;
        const {history} = this.props;
        const headers = {
            'ClientAccessToken':accessToken ,
        };
        if (keys.some(key => this.state[key]==='')) {
            return alert ("Some inputs are invalid");            
        }

        this.validateInputs()
            .then((responses) => {
                if (responses.every(response => response.data.length)) {
                    const answers = keys.map(name => ({name, answer: this.state[name]}));                
                    const data=({questions:answers});
                    axios({
                        method:'post',
                        url:'http://saloedov.ml:3001/api/destination',
                        headers,
                        data
                    })
                    .then (
                        resp => {
                        history.push({
                            pathname: '/apartments',
                            state: {
                                token:'EAACEdEose0cBAC8GgwxfJgTBl2UxAwZArOQm1XI5PmgTTM0dDjTXem3o79h1h6ODxTldSQqSgZAdlmBgZAm0jyITIDNRvGv5VITDAsc3MszqJbMs3y7XJkphVI6GpqhoBZASBgxgEWRbOlURJD2H5HBC121xbDgouvMtSmNcrSOULRu6JnFWlUEMighBiHHVMj7uD79vjAZDZD',
                                radius: resp.data.radius,
                                center_lat: resp.data.center_lat,
                                center_long: resp.data.center_lot,
                                apartments : resp.data.apartments
                            }
                        })
                    })
                    .catch(error => console.log(error))
                }
                else {
                  alert("Some inputs are invalid");   
                }         
            })
            .catch(() => alert("Some inputs are invalid"));
    }

    handleToggleRadio = value => this.setState({ region: value });

    onInputChange = e => this.setState({[e.target.name]: e.target.value});

    renderSelect = (question) => {
        const {title, answers, name} = question;
        const variants = answers.map((answer,id) =>
            <option 
                value={answer} 
                key={id}>
                    {answer}
            </option>)
        return (
            <div className={ 'FormPage_Main-Container_Question' }>
                <p className='FormPage_Main-Container_Question_Title' >
                    {title}
                </p>
                <select
                    name={name}
                    value={this.state[name]}
                    onChange={this.onInputChange}>
                    <option value='' disabled>{`Select ${name}`}</option>
                    {variants}
                </select>
            </div>
        )
    }

    renderRadioButtons = (question) => {
        const {title, answers, name} = question;
        const variants = answers.map((answer,id) =>
            <RadioButton key={id} pointColor='#DEBA4D' value={answer}>
                {answer}
            </RadioButton>)
        return (
            <div className={ 'FormPage_Main-Container_Question' }>
                <p className={ 'FormPage_Main-Container_Question_Title' }>
                    {title}
                </p>
                <RadioGroup onChange={ this.handleToggleRadio } horizontal>
                    {variants}
                </RadioGroup>
            </div>
        )
    }
    
    renderInput = (question) => {
        const {title,type, name} = question;
        return (
            <div className={ 'FormPage_Main-Container_Question' }>
                <p className={ 'FormPage_Main-Container_Question_Title' }>
                    {title}
                </p>
            <input
                placeholder='Street, city'
                type={type}
                min='1'
                name={name}
                value={this.state[name]}
                onChange={this.onInputChange}
                className='FormPage_Main-Container_Input'
            />
            </div>
        )
    }
    renderFooter = () => {
        return(
            <div className="LoginPage_Footer">
                <div className='LoginPage_Footer_Nav'>
                    Best recommendations for apartments issue <br/>
                    | IASA |
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className='FormPage'>
                <div className={ 'FormPage_Header' }>
                    <div className={ 'FormPage_Header_Nav' }>
                        <a>Contacts</a>
                    </div>
                    <div className={ 'FormPage_Header_Container' }>
                        <p>For better search results  <br/>
                            fill in our form
                        </p>
                    </div>
                </div>

                <div className={ 'FormPage_Main-Container' }>
                    <div className={ 'FormPage_Main-Container_Wrapper' }>

                        { this.renderRadioButtons(this.state.questions[0]) }

                        { this.renderSelect(this.state.questions[1]) }

                        { this.renderInput(this.state.questions[2]) }

                        { this.renderInput(this.state.questions[3]) }

                        { this.renderInput(this.state.questions[4]) }

                        { this.renderSelect(this.state.questions[5]) }

                        <div onClick={this.onSubmitCLick} className={ 'FormPage_Main-Container_Submit' }>
                            Submit
                        </div>
                    </div>
                </div>
                {this.renderFooter()}
            </div>
        );
    }
}


export default withRouter(FormPage);
