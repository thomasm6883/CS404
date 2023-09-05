import React from 'react'
import PropTypes from 'prop-types'

import { addGame } from '../datahelper.js'

import DetailsContext from '../main.jsx'

export default function GameForm(props) {
  const { value2 } = React.useContext(DetailsContext)
  const setOnChange = value2[1]

  const [form, setForm] = React.useState({
    id: 0,
    name:'',
    year:0,
    desc:'',
    minplayers:0,
    maxplayers:0,
    playTime: 0,
    minplayTime:0,
    maxplayTime: 0,
    minage:0,
    weight: 0,
    rating:0,
    designer:[],
    artist:[],
    publisher:[],
    thumb: 'default.jpg',
    poster: 'default.jpg'
  })


  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    let formJson = Object.fromEntries(formData.entries());
    formJson={
      id: parseInt(formJson.id),
      name: formJson.name,
      year: parseInt(formJson.year),
      desc: formJson.desc,
      minplayers: parseInt(formJson.minplayers),
      maxplayers: parseInt(formJson.maxplayers),
      minPlayTime: parseInt(formJson.minplayTime),
      maxPlayTime: parseInt(formJson.maxplayTime),
      minage: parseInt(formJson.minage),
      weight: parseFloat(formJson.weight),
      rating: parseFloat(formJson.rating),
      designer: formJson.designer.split(','),
      artist: formJson.artist.split(','),
      publisher: formJson.publisher.split(','),
      thumb: formJson.thumb,
      poster: formJson.poster
    }

    if (addGame(formJson)) {
      setOnChange(true)
      console.log("Game submitted for validation")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <h1>{'Enter A New Game Here'}</h1>
        <div className='row'>

          <div className="form-group col-md-4">
            <label htmlFor='id'>{'Enter Id'}</label>
            <input value={form.id} type='number' className='form-control' name='id' onChange={(e) => {
              setForm({
                ...form,
                id: parseInt(e.target.value)
              })
            }} required/>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor='name'>{'Name'}</label>
            <input value={form.name} type='text' className='form-control' name='name' onChange={(e) => {
              setForm({
                ...form,
                name: e.target.value
              })

            }} required/>
          </div>

        </div>



        <div className="form-group- col-md-4">
          <label htmlFor='desc'>{'Description'}</label>
          <textarea value={form.desc} name='desc' cols='50' rows='4' onChange={(e) => {
            setForm({
              ...form,
              desc: e.target.value
            })
          }} required></textarea>
        </div>



        <div className='row'>

          <div className="form-group col-md-4">
            <label htmlFor='year'>{'Year'}</label>
            <input value={form.year} type='number' className='form-control' name='year'onChange={(e) => {
            setForm({
              ...form,
              year: parseInt(e.target.value)
            })
          }} required/>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor='minage'>{'minage'}</label>
            <input value={form.minage} type='number' className='form-control' name='minage' onChange={(e) => {
            setForm({
              ...form,
              minage: parseInt(e.target.value)
            })
          }} required/>
          </div>

        </div>



        <div className="form-group col-md-4">
          <label htmlFor='rating' className='form-label'>{'Rating'}</label>
          <input value={form.rating} type='range' className='form-range' min='0' max='10' step="0.1" name='rating' onChange={(e) => {
            setForm({
              ...form,
              rating: parseFloat(e.target.value)
            })
          }}/>
          <output>{form.rating}</output>
        </div>



        <div className='row'>

          <div className="form-group col-md-2">
            <label htmlFor='minplayers'>{'Minimum Players'}</label>
            <input value={form.minplayers} type='number' className='form-control' name='minplayers'
            onChange={(e) => {
              setForm({
                ...form,
                minplayers: parseInt(e.target.value)
              })
            }} required/>
          </div>

          <div className="form-group col-md-2">
            <label htmlFor='maxplayers'>{'Maximum Players'}</label>
            <input value={form.maxplayers} type='number' className='form-control' name='maxplayers' onChange={(e) => {
            setForm({
              ...form,
              maxplayers: parseInt(e.target.value)
            })
          }} required/>
          </div>

          <div className="form-group col-md-2">
            <label htmlFor='minplayTime'>{'Minimum Time'}</label>
            <input value={form.minplayTime} type='number' className='form-control' name='minplayTime' onChange={(e) => {
            setForm({
              ...form,
              minplayTime: parseInt(e.target.value)
            })
          }} required/>
          </div>

          <div className="form-group col-md-2">
            <label htmlFor='maxplayTime'>{'Maximum Time'}</label>
            <input value={form.maxplayTime} type='number' className='form-control' name='maxplayTime' onChange={(e) => {
            setForm({
              ...form,
              maxplayTime: parseInt(e.target.value)
            })
          }} required/>
          </div>

        </div>



        <div className="form-group col-md-4">
          <label htmlFor='weight' className='form-label'>{'Weight'}</label>
          <input value={form.weight} type='range' className='form-range' min='0' max='5' step="0.01" name='weight' onChange={(e) => {
            setForm({
              ...form,
              weight: parseFloat(e.target.value)
            })
          }}/>
          <output>{form.weight}</output>
        </div>



        <div className='row'>

          <div className="form-group col-md-4">
            <label htmlFor='designer'>{'Designers'}</label>
            <input value={form.designer} type='text' className='form-control' name='designer' onChange={(e) => {
              setForm({
                ...form,
                designer: e.target.value.split(',')
              })
            }} required/>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor='artist'>{'Artists'}</label>
            <input value={form.artist} type='text' className='form-control' name='artist' onChange={(e) => {
            setForm({
                ...form,
                artist: e.target.value.split(',')
              })
            }} required/>
          </div>

        </div>



        <div className='row'>

          <div className="form-group col-md-4">
            <label htmlFor='publisher'>{'Publishers'}</label>
            <input value={form.publisher} type='text' className='form-control' name='publisher' onChange={(e) => {
              setForm({
                ...form,
                publisher: e.target.value.split(',')
              })
            }} required/>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor='thumb'>{'Image Thumb'}</label>
            <input value={form.thumb} type='text' className='form-control' name='thumb' onChange={(e) => {
              setForm({
                ...form,
                thumb: e.target.value
              })
            }} required/>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor='poster'>{'Image Poster'}</label>
            <input value={form.poster} type='text' className='form-control' name='poster' onChange={(e) => {
              setForm({
                ...form,
                poster: e.target.value
              })
            }} required/>
          </div>

        </div>


        <input type='submit' value='Submit' className="btn btn-primary"/>

      </form>
  )
}
