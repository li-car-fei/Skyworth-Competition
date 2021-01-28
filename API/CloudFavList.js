import {Collection,_} from './cloudBase/database'
const FavCollection=new Collection('userFav');

async function getFavListData(){
  const FavResult=await FavCollection.get({});
  return FavResult.data;
};

async function getFavListNum(){
  const FavResult=await FavCollection.get({});
  return FavResult.data.length||0
};

module.exports={
  getFavListData,
  getFavListNum
}


