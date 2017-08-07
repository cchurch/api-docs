FROM ruby:2.3.1

WORKDIR /usr/src/app
COPY Gemfile ./
RUN bundle install

ADD . .
EXPOSE 4567

