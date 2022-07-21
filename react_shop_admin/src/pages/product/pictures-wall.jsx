import React, { Component } from 'react'
import { Upload, Modal, message, Icon } from 'antd';
import {reqDeleteImg} from '../../api/index'
import { BASE_IMAGE_URL } from '../../utils/constants'
import PropTypes from 'prop-types'


//图片上传组件

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {

  static propTypes = {
    image: PropTypes.string
  }

  state = {
    previewVisible: false, //标识是否显示大图预览，即模态框显示与否
    previewImage: '',    //预览的大图地址
    fileList: [
      // {
      //   uid: '-1',  //每个图片文件唯一的id,设置为负数，防止与服务器内部id冲突
      //   name: 'image.png',   //图片文件名
      //   status: 'done',    //图片状态：done：已上传  uploading 正在上传  removed 已删除
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'  //图片地址
      // }
    ]
  };

  constructor(props) {
    super(props)

    let fileList = []
    const { image } = this.props
    if (image) {
      fileList = [{
        uid: -1,
        name: image,
        status: 'done',
        url: BASE_IMAGE_URL + image
      }]
    }

    //初始化状态
    this.state = {
      previewVisible: false, //标识是否显示大图预览
      previewImage: '',    //预览的大图地址
      fileList
    }
  }

  //获取所有已上传图片文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  //点击取消 隐藏model
  handleCancel = () => this.setState({ previewVisible: false });

  //
  handlePreview = async file => {
    //显示file指定的大图
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /**
   * file: 当前操作的图片文件（上传/删除）
   * fileList: 所有已上传的图片文件对象数组
   */
  handleChange = async ({ file, fileList }) => {
    // console.log('handleChange',file,fileList)
    //图片上传成功
    if (file.status === 'done') {
      //上传服务器返回结果
      const result = file.response
      if (result.code === 200) {
        message.success(result.msg)
        //对上传图片的信息进行修正
        const { name, url } = result
        //取得最新上传文件所在文件数组的位置，即在最后1位
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('图片上传失败')
      }
    } else if (file.status === 'removed') {
      const result = await reqDeleteImg(file.name)
      if(result.code===200){
        message.success(result.msg)
      } else {
        message.error(result.msg)
      }

    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action='/api/upload' //上传图片的接口地址
          accept='image/*'   //只接收图片格式
          name='image'   //上传图片的参数名
          listType="picture-card"   //上传图片的显示样式
          fileList={fileList}   //所有已上传图片文件对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {/* 上传超过1张，上传按钮消失 */}
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
