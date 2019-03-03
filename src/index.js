import _ from 'lodash';
import 'bootstrap';
import './style/style.scss';
import dataset from '../src/source/pokedex.json';

$(document).ready(function () {

  var pokedex = {
    data: new Object(),
    pokemonDetail: new Object(),
    currentSelected: null,
    currentID: null,
    attributeJSON: [],

    init: function () {
      this.data.pokemons = dataset;
      this.cacheDom();
      this.render();
      this.bindEvents();
    },

    cacheDom: function () {
      this.$el = $('#pokedex-dashboard');
      this.template = this.$el.find('#pokemon-template').html();
      this.$targetContainer = this.$el.find('#pokemonList');
      this.$details = this.$el.find('#pokemon-details');
      this.detailTemplate = this.$el.find('#pokemon-details').html();
      this.$detailsContainer = this.$el.find('#pokemon-detail-modal');
      this.$updatePokemon = this.$el.find('#updatePokemon');
      this.$attributeContainer = this.$el.find('.pokemon-attribute-container');
    },

    bindEvents: function () {
      this.$card.on('click', this.setCurrentPokemon.bind(this));
      this.$updatePokemon.on('click', this.mapUpdateValues.bind(this));
    },

    render: function () {
      var html = Mustache.to_html(this.template, this.data);
      this.$targetContainer.html(html);
      this.$card = $('.pokemon-card');
    },

    setCurrentPokemon: function () {
      this.currentID = $(event.currentTarget).attr('data-id');
      this.currentSelected = this.data.pokemons.find(item => item.id == this.currentID);
      this.pokemonDetail.pokemon = this.currentSelected;
      this.openPopup();
    },

    openPopup: function () {
      $(this.$detailsContainer).addClass('open');
      this.renderPokemonDetails();
    },

    renderPokemonDetails: function () {
      var html = Mustache.to_html(this.detailTemplate, this.pokemonDetail);
      this.$detailsContainer.html(html);
      this.init();
    },

    mapUpdateValues: function () {
      var obj = {};
      this.$attributeContainer.find('.pokemon-attr').each(function () {
        let key = $(this).find('.poke-key').text().toLowerCase();
        let value = $(this).find('.poke-value').val().toLowerCase();
        obj[key] = value;
      });
      this.attributeJSON = obj;
      this.updatePokemon();
    },

    updatePokemon: function () {
      for (var item in this.currentSelected) {
        this.currentSelected['name']['english'] = this.attributeJSON['name'];
        this.currentSelected['type'] = this.attributeJSON['type'];
        this.currentSelected['base']['Attack'] = this.attributeJSON['attack'];
        this.currentSelected['base']['Defense'] = this.attributeJSON['defense'];
      }
    }

  };

  var createNewPokemon = {
    newPokemon: Object,
    data: dataset,

    init: function () {
      this.cacheDom();
      this.render();
      this.bindEvents();
    },

    cacheDom: function () {
      this.$el = $('#pokedex-dashboard');
      this.$createNewBtn = this.$el.find('#addPokemon');
      this.$addRowBtn = this.$el.find('.add-row');
      this.$popup = this.$el.find('#pokemon-create-modal');
      this.$newAttrRow = this.$el.find('.new-attr');
      this.$container = this.$el.find('.pokemon-attribute-container');
      this.$save = this.$el.find('#savePokemon');
    },

    bindEvents: function () {
      this.$createNewBtn.on('click', this.openCreatePopup.bind(this));
      this.$addRowBtn.on('click', this.addNewAttribute.bind(this));
      this.$save.on('click', this.mapNewAttributes.bind(this))
    },

    render: function () {

    },

    openCreatePopup: function () {
      $(this.$popup).addClass('open');
      $(this.$container).find('.new-attr').remove();
    },

    addNewAttribute: function () {
      $(this.$newAttrRow).clone().insertBefore(this.$el.find('.pokemon-add-row').last());
      $(this.$container).find('.new-attr').removeClass('d-none');
    },

    createNewPokemon: function () {
      this.data.push(this.newPokemon);
    },

    mapNewAttributes: function () {
      var obj = {};
      this.$container.find('.new-attr').each(function () {
        let key = $(this).find('.poke-key').text().toLowerCase();
        let value = $(this).find('.poke-value').val().toLowerCase();
        obj[key] = value;
      });
      this.newPokemon = obj;
      this.createNewPokemon();
    }

  }


  /*-----Initialise----*/
  pokedex.init();
  createNewPokemon.init();

  $(document).on('click', '.close,.update-btn', function () {
    $('.pokemon-detail-modal').removeClass('open');
  });



  /*-----Delete pokemon with ID > 151 ----*/
  $('.pokemon-card').each(function () {
    var id = $(this).attr('data-id');
    if (parseInt(id) > 151) {
      $(this).append('<button type="button" class="close pok-delete" id="pokemon-delete" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span></button>');
    }
  });

});


