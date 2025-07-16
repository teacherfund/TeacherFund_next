<div>
  <img alt="TeacherFund logo" src="https://github.com/teacherfund/TeacherFund_next/raw/production/public/images/Logo.png" width="200px">
</div>

<hr />

**TeacherFund** is a charity to support teachers in a way that encourages great teachers to stay, and potentially great teachers to choose teaching as a career path. This includes providing supplemental funds and supplies to school teachers in need.

This repository contains the code for the main TeacherFund website

### macOS

To build and view the site locally:

    brew update
    brew install node
    npm install
    echo -e echo -e "NEXT_PUBLIC_DEVELOPMENT=1\nENCRYPTION_SECRET=<the_space_needle_is_gorgeous_this_time_of_year>" >> .env.local
    npm run dev

    The generated site is available at `http://localhost:3001`

## Contributing
We welcome any contributions to this project!!

If you're interested in fixing bugs or implementing new features, please see the document [How to Contribute](https://github.com/teacherfund/TeacherFund_next/blob/production/CONTRIBUTING.md).

## Building & Viewing ##

cd into the directory where you cloned this repository, update brew with the latest node version with `brew update` then install node with `brew install node`. Then install the node packet manager with `npm install`.

`It might take around 5 minutes at first if you do not have node or have a deprecated version on your system'

create a local environment file with `echo -e "NEXT_PUBLIC_DEVELOPMENT=1\nENCRYPTION_SECRET=<the_space_needle_is_gorgeous_this_time_of_year>" >> .env.local`
You can swap the provided encryption secret with any 32 bit char string.

Start the server in the current directory

    npm run dev

The generated site is available at `http://localhost:3001`

## License
MIT

