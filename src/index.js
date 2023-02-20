import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { faker } from "@faker-js/faker";
// moment untuk mengecek tanggal input ke tanggal sekarang
import moment from "moment/moment";

// mengisi data post
const dataPost = [
  {
    name: faker.name.fullName(), // set dengan faker dengan jenis nama lengkap
    image: faker.image.avatar(), // set dengan faker dengan jenis gambar avatar
    post: faker.lorem.lines(), // set dengan faker jenis lorem
    // dari data faker, kemudian package moment akan menghitung selisih dengan tanggal sekarang
    createdAt: moment(faker.date.recent()).fromNow(),
    likeCount: 2,
  },
  {
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    post: faker.lorem.lines(),
    createdAt: moment(faker.date.recent()).fromNow(),
    likeCount: 10,
  },
  {
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    post: faker.lorem.lines(),
    createdAt: moment(faker.date.recent()).fromNow(),
    likeCount: 1,
  },
];

class CommentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // inisialisasi state count dengan value like pada data (props)
      count: this.props.likeCount,
    };
  }
  render() {
    return (
      <div className="ui container comments">
        <div className="comment">
          <a href="/" className="avatar">
            <img alt="avatar" src={this.props.avatar} />
          </a>
          <div className="content">
            <a href="/" className="author">
              {this.props.name}
            </a>
            <div className="metadata">
              <span className="date">
                {/* memanggil class LikeCount untuk menampilkan jumlah like dengan value state count */}
                {this.props.time} | <LikeCount dataLike={this.state.count} />
              </span>
            </div>
            <div className="text">{this.props.comment}</div>
          </div>
        </div>
        {/* <Like currentLike={this.state.count} /> */}
        {/* jika tombol diklik, maka akan merubah value state */}
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click on me
        </button>
      </div>
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return this.props.data.map((dataComment, index) => (
      <div className="commentContainer" key={index}>
        {/* avatar = value
        avatar tersebut merupakan property props pada CommentContainer
         */}
        <CommentContainer
          avatar={dataComment.image}
          time={dataComment.createdAt}
          name={dataComment.name}
          comment={dataComment.post}
          likeCount={dataComment.likeCount}
        />
      </div>
    ));
  }
}

class LikeCount extends React.Component {
  // menampilkan berdasarkan props dataLike yang diambil dari class CommentContainer
  render() {
    return <span>Like : {this.props.dataLike}</span>;
  }
}

// class Like extends React.Component {
//   constructor(props) {
//     // agar data yg dikirim, bisa diterima
//     super(props);
//     this.state = {
//       count: this.props.currentLike,
//     };
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           Click on me
//         </button>
//       </div>
//     );
//   }
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
// nilai dari dataPost[] akan dipassing ke var data yang akan dibaca pada fungsi App
// root.render(<Comments data={dataPost} />);
root.render(<Comments data={dataPost} />);
