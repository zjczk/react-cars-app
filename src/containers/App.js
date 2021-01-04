import React, { Component } from 'react';

import './App.css';

import Header from '../components/Header/Header'
import SectionList from '../components/SectionList/SectionList';
import UserCar from '../components/UserCar/UserCar'

class App extends Component {
  
  state = {carCharac: []};

  async componentDidMount() {
    try {
    const url = "http://localhost:8080/api/makes"
    const response = await fetch(url);

    if (!response.ok) {
      throw Error('Sorry, we couldn\'t connect to the server')
    }

    const data = await response.json();
    const makes = data;
    this.setState({makes: makes, loading: true}); 

    } catch (error) {
      this.setState({textError: error.message, hasError: true});
    }
  } 

  getModels = (makeIndex) => {
    const make = this.state.makes[makeIndex]
    
    fetch(`http://localhost:8080/api/models?make=${make}`)
      .then((response) => { 
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Sorry, we couldn't load ${make} models`);
        }
      })
      .then((data) => {
        
        if (!data.length) {
          this.setState({loading: !this.state.loading, make: make})
        } else {
          const models = data;

          const carCharac = [...this.state.carCharac];
          carCharac.push(make);

          this.setState({
            makes: null,
            make: make,
            models: models, 
            carCharac: carCharac
            })
          }
        })
      .catch((error) => {
        this.setState(
          {
          textError: error.message, 
          hasError: true,
          loading: !this.state.loading,
          makes: null
          }
        );
      } 
    );
  }

  getFuelTypes = (modelIndex) => {
    const make = this.state.make;
    const model = this.state.models[modelIndex];

    fetch(`http://localhost:8080/api/vehicles?make=${make}&model=${model}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Sorry, we couldn't load fuel types for ${make} ${model}`);
      }
    })
    .then((data) => {

      if (!data.length) {
        this.setState({loading: !this.state.loading, model: model}) 
      } else {
        const vehicles = 
        data
        .filter((e, i) => data
        .findIndex(e2 => Object.keys(e2).every(prop => e2[prop] === e[prop])) 
        === i);

        const fuelTypes = [...new Set(vehicles.map(vehicle => vehicle.fuelType))];

        const carCharac = [...this.state.carCharac];
        carCharac.push(model);

        this.setState(
          {
          models: null,
          model: model,
          fuelTypes: fuelTypes,
          vehicles: vehicles,
          carCharac: carCharac
          }
        )
      }
    })
    .catch((error) => {
      this.setState({
        textError: error.message, 
        hasError: true,
        loading: !this.state.loading,
        models: null
      });
    });
  }

  getEngineCapacities = (fuelIndex) => {
    const fuelType = this.state.fuelTypes[fuelIndex];

    const vehicles = [...this.state.vehicles]; 

    const vehiclesWithFuelType = vehicles.filter(obj => {
      return obj.fuelType === fuelType
    })

    const engineCapacities = [...new Set(vehiclesWithFuelType.map(vehicle => `${vehicle.engineCapacity}cc`))];

    const carCharac = [...this.state.carCharac];
    carCharac.push(fuelType);

    this.setState({
      fuelType: fuelType,
      fuelTypes: null,
      engineCapacities: engineCapacities,
      vehicles: vehiclesWithFuelType,
      carCharac: carCharac
    })
  }

  
  getEnginePowerUnits = (engineCapacityIndex) => {

    let engineCapacity = this.state.engineCapacities[engineCapacityIndex];

    const carCharac = [...this.state.carCharac];
    carCharac.push(engineCapacity);

    engineCapacity = Number(engineCapacity.replace(/\D/g,''));

    const vehicles = [...this.state.vehicles]; 

    const vehiclesWithEngineCapacity = vehicles.filter(obj => {
      return obj.engineCapacity === engineCapacity
    })

    const enginePowerUnits = [...new Set( 
      vehiclesWithEngineCapacity.map(vehicle => `${vehicle.enginePowerPS}PS - ${vehicle.enginePowerKW}kW`)
        )];

    this.setState({
      engineCapacity: engineCapacity,
      engineCapacities: null,
      enginePowerUnits: enginePowerUnits,
      vehicles: vehiclesWithEngineCapacity, 
      carCharac: carCharac
    })
  }

  getBodyTypes = (enginePowerUnitsIndex) => {
    const enginePowerUnits = this.state.enginePowerUnits[enginePowerUnitsIndex]

    const vehicles = [...this.state.vehicles]; 
    
    const enginePowerUnitsMod = enginePowerUnits.replace(/[^\d-]/g, '').split(/-/g).slice()
    const enginePowerPS = Number(enginePowerUnitsMod[0]);
    const enginePowerKW = Number(enginePowerUnitsMod[1]);
   
    const vehiclesWithEnginePowerUnits = vehicles.filter(obj => {
      return obj.enginePowerPS === enginePowerPS && obj.enginePowerKW === enginePowerKW
    })

    const bodyTypes = [...new Set(vehiclesWithEnginePowerUnits.map(vehicle => vehicle.bodyType))];

    const carCharac = [...this.state.carCharac];
    carCharac.push(enginePowerUnits);

    this.setState({
      enginePowerPS: enginePowerPS,
      enginePowerKW: enginePowerKW,
      enginePowerUnits: null,
      bodyTypes: bodyTypes,
      vehicles: vehiclesWithEnginePowerUnits,
      carCharac: carCharac
    })
  }

  handleClickBodyType = (bodyTypeIndex) => {
    const bodyType = this.state.bodyTypes[bodyTypeIndex];

    const vehicles = [...this.state.vehicles];

    const vehiclesWithBodyType = vehicles.filter(obj => {
      return obj.bodyType === bodyType
    })

    const userCar = vehiclesWithBodyType[0];

    const carCharac = [...this.state.carCharac];
    carCharac.push(bodyType);

    this.setState({
      bodyType: bodyType,
      bodyTypes: null,
      vehicles: null,
      userCar: userCar,
      loading: !this.state.loading,
      carCharac: carCharac
    })
  }
  
  render() {

    const style = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: '#1eafed',
      fontWeight: 'bold',
      borderRadius: '30px',
      color: 'white',
      marginTop: '10px'
    }

    let errorMessage = null;

    if (!!this.state.hasError) {
      errorMessage = (
        <div style={style}>
          <p>{this.state.textError}</p>
          <p>{this.state.carCharac.length ?
            'Please try again later' :
            'Our team is already working on it'}</p>
        </div>
      )
    }

    return (
      <div className="App">
        <Header 
        title={this.props.title}
        names={this.state.carCharac}
        />
      {!!this.state.loading && 
      <React.Fragment>
        <SectionList
        sections={
          this.state.makes || 
          this.state.models ||
          this.state.fuelTypes || 
          this.state.engineCapacities || 
          this.state.enginePowerUnits ||
          this.state.bodyTypes
        }
        clicked={
          (this.state.makes && this.getModels) ||
          (this.state.models && this.getFuelTypes) ||
          (this.state.fuelTypes && this.getEngineCapacities) || 
          (this.state.engineCapacities && this.getEnginePowerUnits) ||
          (this.state.enginePowerUnits && this.getBodyTypes) ||
          this.handleClickBodyType
        }
        message={
          (this.state.makes && "Please choose your car:") ||
          (this.state.models && "What is the model of the car?") ||
          (this.state.fuelTypes && "Which fuel type does your car have?") ||
          (this.state.engineCapacities && "How big is the engine?") || 
          (this.state.enginePowerUnits && "What is the car engine power?") ||
          "What is the body style?"
        }
          />
      </React.Fragment>}
      {(!this.state.loading && (this.state.makes || this.state.models)) && 
        <div style={style}>
          <p>Sorry, currently we don't provide service for {this.state.make} {this.state.models ? 
            `${this.state.model} model` : null}
          </p>
        </div>}
      {this.state.userCar &&     
        <UserCar
          make={this.state.userCar.make}
          model={this.state.userCar.model}
          bodyType={this.state.bodyType}
          engineCapacity={this.state.userCar.engineCapacity}
          fuelType={this.state.userCar.fuelType}
          enginePowerPS={this.state.userCar.enginePowerPS}
        >Congratulations!</UserCar>}
      {errorMessage}
      </div>
    );
  }
}

export default App;
