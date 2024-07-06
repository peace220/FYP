import React from 'react';

const CurriculumItem = ({ item }) => {
  return (
    <div className="border p-2 mb-2 bg-white">
      <p className="font-semibold">{item.type === 'lecture' ? `Lecture ${item.id}` : `Quiz ${item.id}`}: {item.title}</p>
    </div>
  );
};

export default CurriculumItem;
