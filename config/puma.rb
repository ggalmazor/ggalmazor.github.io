workers ENV.fetch('WEB_CONCURRENCY') { 2 }

preload_app!

rackup      DefaultRackup
port        ENV.fetch("PORT") { 3000 }
