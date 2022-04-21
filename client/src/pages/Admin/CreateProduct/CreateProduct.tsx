import React from 'react';
import { Input } from '../../../components/Input/Input';
import { useForm } from 'react-hook-form';
import styles from './CreateProduct.module.scss';
import { Button } from '../../../components/Button/Button';
import $api from '../../../http';

export const CreateProduct = () => {
  const [previewFiles, setPreviewFiles] = React.useState<any[]>([]);
  const [files, setFiles] = React.useState<any[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('weight', data.weight);
    formData.append('category', data.category);
    formData.append('img', (data.img = files[0]));
    await $api.post('/api/product/add', formData);
  };

  const selectFile = (e: any) => {
    const images = [] as any[];
    images.push({ img: URL.createObjectURL(e.target.files[0]), number: Date.now() });
    setPreviewFiles(images);
    setFiles(e.target.files);
  };

  return (
    <div className={styles.createProductBlock}>
      <h2 className={styles.title}>Добавление продукта</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.product}>
        <label htmlFor='name'>
          Название:
          <Input
            {...register('name', { required: { value: true, message: 'Введите название продукта' } })}
            placeholder='Название продукта'
            type='text'
            error={errors.name}
          />
        </label>
        <label htmlFor='price'>
          Цена:
          <Input
            {...register('price', { required: { value: true, message: 'Введите цену' } })}
            placeholder='Цена'
            type='text'
            error={errors.price}
          />
        </label>
        <label htmlFor='description'>
          Описание:
          <Input
            {...register('description', { required: { value: true, message: 'Введите описание' } })}
            placeholder='Описание'
            type='text'
            error={errors.description}
          />
        </label>
        <label htmlFor='weight'>
          Вес/объём:
          <Input
            {...register('weight', { required: { value: true, message: 'Введите вес/объём' } })}
            placeholder='Вес'
            type='text'
            error={errors.weight}
          />
        </label>
        <label htmlFor='category'>
          Категория:
          <Input
            {...register('category', { required: { value: true, message: 'Введите вес/объём' } })}
            placeholder='Вес'
            type='text'
            error={errors.category}
          />
        </label>
        {previewFiles.length > 0 && (
          <div className={styles.previewBlock}>
            {previewFiles.map((f: any, index) => (
              <div className={styles.previewImage} key={f.img}>
                <img src={f.img} alt={'image' + index} />
              </div>
            ))}
          </div>
        )}
        <div className={styles.inputFile}>
          <label htmlFor='img'>
            Изображениe:
            <Input
              {...register('img', { required: { value: true, message: 'Выберите изображение' } })}
              placeholder='Выберите изображение'
              type='file'
              id='file'
              error={errors.img}
              onChange={selectFile}
              className={styles.file}
            />
            <label htmlFor='file'>
              <span className={styles.inputBtn}>{previewFiles.length <= 0 ? 'Выберите файл' : 'Файл выбран'}</span>
            </label>
          </label>
        </div>
        <Button disabled={!isValid} className={styles.btn}>
          Добавить
        </Button>
      </form>
    </div>
  );
};
