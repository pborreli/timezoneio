var React = require('react');
var Header = require('../components/header.jsx');
var Footer = require('../components/footer.jsx');
var TimezoneList = require('../components/timezoneList.jsx');

var demoTimezones = [
  {
    tz: 'America/Los_Angeles',
    people: [
      {
        _id: '3',
        name: 'Mary',
        tz: 'America/Los_Angeles',
        location: 'San Francisco',
        avatar: '/images/avatars/mary.jpg'
      }
    ]
  },
  {
    tz: 'America/New_York',
    people: [
      {
        _id: '1',
        name: 'Dan',
        tz: 'America/New_York',
        location: 'New York',
        avatar: '/images/avatars/dan.jpg'
      },
      {
        _id: '2',
        name: 'Sunil',
        tz: 'America/New_York',
        location: 'DC',
        avatar: '/images/avatars/sunil.png'
      }
    ]
  },
  {
    tz: 'Europe/Rome',
    people: [
      {
        _id: '4',
        name: 'Carolyn',
        tz: 'Europe/Rome',
        location: 'Venice',
        avatar: 'http://www.gravatar.com/avatar/17d551ff33a7b03d93bbd1f8fa18d4f5?s=200'
      }
    ]
  }
];

var cities = [
  'London',
  'New York',
  'Santiago',
  'Melbourne',
  'Berlin',
  'Idaho',
  'Cape Town',
  'Osaka',
  'LA',
  'Chang Mai',
  'Ubud',
  'Bangalore',
  'Stockholm'
];

module.exports = React.createClass({

  displayName: 'Homepage',

  getInitialState: function() {
    return {
      timezones: demoTimezones,
      searchCities: cities,
      searchCityIdx: 0,
      searchCity: cities[0]
    };
  },
  showNextSearchCity: function() {

    var TYPE_DELAY = 100;
    var BACKSPACE_DELAY = 60;
    var CITY_DELAY = 1000;

    var backspace = function() {
      var partial = this.state.searchCity;
      if (!partial.length)
        return setTimeout(nextCity, BACKSPACE_DELAY);

      partial = partial.substr(0, partial.length - 1);
      this.setState({ searchCity: partial });
      setTimeout(backspace, BACKSPACE_DELAY);
    }.bind(this);

    var nextCity = function() {
      var nextIdx = this.state.searchCityIdx + 1 >= this.state.searchCities.length ?
                    0 :
                    this.state.searchCityIdx + 1;
      this.setState({ searchCityIdx: nextIdx });
      setTimeout(type, TYPE_DELAY);
    }.bind(this);

    var type = function() {
      var full = this.state.searchCities[this.state.searchCityIdx];
      if (this.state.searchCity === full)
        return setTimeout(backspace, CITY_DELAY);

      var partial = this.state.searchCity;
      partial = full.substr(0, partial.length + 1);
      this.setState({ searchCity: partial });
      setTimeout(type, TYPE_DELAY);
    }.bind(this);

    // Start it!
    backspace();
  },
  componentDidMount: function() {
    // Probably bad practice, but whatever
    setTimeout(this.showNextSearchCity, 2000);
  },
  render: function() {
    var honeyPotStyle = { "position": "absolute", "left": "-5000px" };
    return (
      <div className="container">

        <Header {...this.props}
                demo={true}
                link={false} />

        <div className="hp-section demo">

          <h2 className="hp-headline">
            Keep track where and <em>when</em> your team is.
          </h2>
          <div className="hp-demo">
            <TimezoneList time={this.props.time}
                          timeFormat={this.state.timeFormat}
                          timezones={this.state.timezones} />
          </div>

        </div>

        <div className="hp-section alt">

          <div className="hp-content-container">

            <h3 className="hp-pitch">
              Easily plan meetings + calls with your remote, nomadic team without having to Google <br/>
              <span className="hp-pitch-search">time in {this.state.searchCity}</span><br/>
              <em>...ever again.</em>
            </h3>

          </div>

        </div>

        <div className="hp-section">

          <div className="hp-content-container">

            <p className="hp-description">
              Modern global teams have awesome people spread across multiple timezones.
              Lots of teams have <em>digital nomads</em> changing locations faster than
              we can keep up with. Often it gets tricky to remember what time it is
              where your teammates are. That's why we built <strong>Timezone.io</strong>.
            </p>

            <h3 className="hp-description">
              So, what's next?
            </h3>

            <p className="hp-description">
              We're starting off with a simple, clear way to display where your team is by timezone.
              Next we'll add some ways to automatically update people's locations.
              We have a few ideas we're been thinking about, but we'd love to hear
              what you would work best for you: Update your location using the
              location of your last Tweet? Want to use Slackbot or Hubot?
              What about a command line utility? We can't wait to hear your ideas!
            </p>

            <h4 className="hp-description">
              Send your wants, needs and encouragement over to <a href="https://twitter.com/timezoneio">
              <strong>@timezone.io</strong> on Twitter</a> and if you would like to
              be notified when you can sign up, add your email address below:
            </h4>

            <div className="hp-description">

              <div id="mc_embed_signup">
              <form action="//timezone.us10.list-manage.com/subscribe/post?u=34f393bbea3791dbad5109a7b&amp;id=cb191e06bc"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    noValidate>
                <div id="mc_embed_signup_scroll">

                  <div className="mc-field-group">
                    <input type="email"
                           defaultValue=""
                           name="EMAIL"
                           placeholder="email address"
                           className="required email"
                           id="mce-EMAIL"/>
                  </div>
                  <div id="mce-responses" className="clear">
                    <div className="response" id="mce-error-response" style={{display: "none"}}></div>
                    <div className="response" id="mce-success-response" style={{display: "none"}}></div>
                  </div>
                  <div style={honeyPotStyle}>
                    <input type="text" name="b_34f393bbea3791dbad5109a7b_cb191e06bc" tabIndex="-1" defaultValue="" />
                  </div>
                  <div className="clear">
                    <input type="submit"
                          value="Sign up for Early Access"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="button cta"/>
                  </div>
                </div>
              </form>
              </div>
            </div>

          </div>

        </div>

        <Footer />

      </div>
    );
  }
});
