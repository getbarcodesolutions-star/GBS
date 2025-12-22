import React, { useEffect, useState } from 'react'
import image from '/assets/images/image.png'
import axios from 'axios'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Add = ({ token }) => {

  // images
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  // common
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [bestseller, setBestseller] = useState(false)
  const [loading, setLoading] = useState(false)

  // label / ribbon
  const [size, setSize] = useState('')
  const [ribbonsize, setRibbonsize] = useState('')
  const [grade, setGrade] = useState('')
  const [paper, setPaper] = useState('')
  const [perroll, setPerroll] = useState('')
  const [core, setCore] = useState('')
  const [ups, setUps] = useState('')
  const [winding, setWinding] = useState('')
  const [weight, setWeight] = useState('')

  // printer
  const [resolution, setResolution] = useState('')
  const [brand, setBrand] = useState('')
  const [modelno, setModelno] = useState('')
  const [maxPrintSpeed, setMaxPrintSpeed] = useState('')
  const [maxWidth, setMaxWidth] = useState('')
  const [maxLength, setMaxLength] = useState('')
  const [dimension, setDimension] = useState('')
  const [labelRollCapacity, setLabelRollCapacity] = useState('')
  const [ribbon, setRibbon] = useState('')
  const [processor, setProcessor] = useState('')
  const [memory, setMemory] = useState('')
  const [interfaceType, setInterfaceType] = useState('')
  const [power, setPower] = useState('')
  const [operationSwitch, setOperationSwitch] = useState('')
  const [sensors, setSensors] = useState('')
  const [accessories, setAccessories] = useState('')
  const [warranty, setWarranty] = useState('')

  // reset when category changes
  useEffect(() => {
    setName('')
    setDescription('')
    setPrice('')
    setBestseller(false)

    setSize('')
    setRibbonsize('')
    setModelno('')
    setGrade('')
    setPaper('')
    setPerroll('')
    setCore('')
    setUps('')
    setWinding('')
    setWeight('')

    setBrand('')
    setResolution('')
    setMaxPrintSpeed('')
    setMaxWidth('')
    setMaxLength('')
    setDimension('')
    setLabelRollCapacity('')
    setRibbon('')
    setProcessor('')
    setMemory('')
    setInterfaceType('')
    setPower('')
    setOperationSwitch('')
    setSensors('')
    setAccessories('')
    setWarranty('')
  }, [category])

  // reset after success
  const resetForm = () => {
    setCategory('')
    setName('')
    setDescription('')
    setPrice('')
    setBestseller(false)

    setSize('')
    setRibbonsize('')
    setModelno('')
    setGrade('')
    setPaper('')
    setPerroll('')
    setCore('')
    setUps('')
    setWinding('')
    setWeight('')

    setResolution('')
    setBrand('')
    setMaxPrintSpeed('')
    setMaxWidth('')
    setMaxLength('')
    setDimension('')
    setLabelRollCapacity('')
    setRibbon('')
    setProcessor('')
    setMemory('')
    setInterfaceType('')
    setPower('')
    setOperationSwitch('')
    setSensors('')
    setAccessories('')
    setWarranty('')

    setImage1(false)
    setImage2(false)
    setImage3(false)
    setImage4(false)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()

      formData.append('category', category)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('bestseller', bestseller)

      formData.append('size', size)
      formData.append('ribbonsize', ribbonsize)
      formData.append('grade', grade)
      formData.append('paper', paper)
      formData.append('perroll', perroll)
      formData.append('core', core)
      formData.append('ups', ups)
      formData.append('winding', winding)
      formData.append('weight', weight)

      formData.append('resolution', resolution)
      formData.append('brand', brand)
      formData.append('modelno', modelno)
      formData.append('maxPrintSpeed', maxPrintSpeed)
      formData.append('maxWidth', maxWidth)
      formData.append('maxLength', maxLength)
      formData.append('dimension', dimension)
      formData.append('labelRollCapacity', labelRollCapacity)
      formData.append('ribbon', ribbon)
      formData.append('processor', processor)
      formData.append('memory', memory)
      formData.append('interface', interfaceType)
      formData.append('power', power)
      formData.append('operationSwitch', operationSwitch)
      formData.append('sensors', sensors)
      formData.append('accessories', accessories)
      formData.append('warranty', warranty)

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const res = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        { headers: { token } }
      )

      if (res.data.success) {
        toast.success('Product added successfully')
        resetForm()
      } else {
        toast.error(res.data.message)
      }

    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='h-350 sm:h-auto'>

      {/* CATEGORY */}
      <div>
        <p className='text-md p-3 text-neutral-200 tracking-widest font-bold'>
          Select the product category
        </p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='sm:ml-3 w-45 cursor-pointer p-2 text-lg tracking-widest text-white font-bold outline-none bg-neutral-600 rounded-lg'
        >
          <option value=''>Select</option>
          <option value='Label'>Label</option>
          <option value='Ribbon'>Ribbon</option>
          <option value='Printer'>Printer</option>
          <option value='Printer parts'>Printer parts</option>
        </select>
      </div>

      {/* IMAGES */}
      {category && (
        <>
          <div>
            <p className='p-3 text-neutral-200 tracking-widest font-bold text-xl'>
              Upload image
            </p>
            <div className='flex gap-2'>
              {[image1, image2, image3, image4].map((img, i) => (
                <label key={i} className='cursor-pointer'>
                  <img
                    className='w-32'
                    src={!img ? image : URL.createObjectURL(img)}
                    alt=''
                  />
                  <input
                    hidden
                    type='file'
                    onChange={(e) =>
                      [setImage1, setImage2, setImage3, setImage4][i](
                        e.target.files[0]
                      )
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          {/* COMMON */}
          <div>
            <p className='text-md p-3 text-neutral-200 tracking-widest font-bold'>
              Product name
            </p>
            <input
              required
              placeholder='Enter product name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='sm:ml-3 md:w-130 w-70 p-2 text-lg tracking-widest text-white font-bold outline-none bg-neutral-600 rounded-lg'
            />
          </div>

          <div>
            <p className='text-md p-3 text-neutral-200 tracking-widest font-bold'>
              Product description
            </p>
            <textarea
              required
              placeholder='Write product description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='sm:ml-3 md:w-130 w-70 p-2 text-lg tracking-widest text-white font-bold outline-none bg-neutral-600 rounded-lg'
            />
          </div>
        </>
      )}

      {/* LABEL */}
      {category === 'Label' && (
        <div className='flex md:w-150 flex-wrap'>
          <Input label='Product size' placeholder='Eg: 100x150 mm' value={size} setValue={setSize} />
          <Input label='Paper' placeholder='Paper type' value={paper} setValue={setPaper} />
          <Input label='Per roll' placeholder='Labels per roll' value={perroll} setValue={setPerroll} />
          <Input label='Core' placeholder='Core size' value={core} setValue={setCore} />
          <Input label='Ups' placeholder='UPS count' value={ups} setValue={setUps} type='number' />
          <Input label='Winding' placeholder='In / Out' value={winding} setValue={setWinding} />
          <Input label='Weight' placeholder='Weight in kg' value={weight} setValue={setWeight} />
          <Price price={price} required='true' setPrice={setPrice} />
        </div>
      )}

      {/* RIBBON */}
      {category === 'Ribbon' && (
        <div className='flex md:w-150 flex-wrap'>
          <Input label='Product size' placeholder='Ribbon size' value={ribbonsize} setValue={setRibbonsize} />
          <Input label='Grade' placeholder='Grade' value={grade} setValue={setGrade} />
          <Input label='Weight' placeholder='Weight in kg' value={weight} setValue={setWeight} />
          <Price price={price} setPrice={setPrice} />
        </div>
      )}

      {/* PRINTER */}
      {category === 'Printer' && (
        <div className='flex md:w-150 flex-wrap'>
          <Input label='Brand' placeholder='Brand name' value={brand} setValue={setBrand} />
          <Input label='Resolution' placeholder='Eg: 203 DPI' value={resolution} setValue={setResolution} />
          <Input label='Max Print Speed' placeholder='Eg: 6 ips' value={maxPrintSpeed} setValue={setMaxPrintSpeed} />
          <Input label='Max Width' placeholder='Eg: 108 mm' value={maxWidth} setValue={setMaxWidth} />
          <Input label='Max Length' placeholder='Eg: 2000 mm' value={maxLength} setValue={setMaxLength} />
          <Input label='Physical Dimension' placeholder='L x W x H' value={dimension} setValue={setDimension} />
          <Input label='Weight' placeholder='Printer weight' value={weight} setValue={setWeight} />
          <Input label='Label Roll Capacity' placeholder='Max roll size' value={labelRollCapacity} setValue={setLabelRollCapacity} />
          <Input label='Ribbon' placeholder='Ribbon supported' value={ribbon} setValue={setRibbon} />
          <Input label='Processor' placeholder='Processor details' value={processor} setValue={setProcessor} />
          <Input label='Memory' placeholder='RAM / Flash' value={memory} setValue={setMemory} />
          <Input label='Interface' placeholder='USB / LAN / WiFi' value={interfaceType} setValue={setInterfaceType} />
          <Input label='Power' placeholder='Power input' value={power} setValue={setPower} />
          <Input label='Operation Switch' placeholder='Buttons / Switches' value={operationSwitch} setValue={setOperationSwitch} />
          <Input label='Sensors' placeholder='Sensor details' value={sensors} setValue={setSensors} />
          <Input label='Accessories' placeholder='Included accessories' value={accessories} setValue={setAccessories} />
          <Input label='Limited Warranty' placeholder='Warranty period' value={warranty} setValue={setWarranty} />
        </div>
      )}

      {/* PARTS */}
      {category === 'Printer parts' && (
        <div className='flex md:w-150 flex-wrap'>
          <Input label='Model no' placeholder='Model number' value={modelno} setValue={setModelno} />
          <Input label='Warranty' placeholder='Warranty period' value={warranty} setValue={setWarranty} />
          <Price price={price} setPrice={setPrice} />
        </div>
      )}

      {category && (
        <>
          <div className='mt-3 sm:ml-3 flex items-center'>
            <input
              id='bestseller'
              type='checkbox'
              checked={bestseller}
              onChange={() => setBestseller(p => !p)}
              className='accent-emerald-400 cursor-pointer w-4 h-4'
            />
            <label
              htmlFor='bestseller'
              className='text-md p-3 text-neutral-200 tracking-widest cursor-pointer'
            >
              Add to bestseller
            </label>
          </div>

          <button
            disabled={loading}
            className={`sm:ml-3 cursor-pointer rounded-2xl text-2xl text-neutral-100 font-bold
              py-2 px-15 tracking-widest mt-4
              ${loading ? 'bg-emerald-500' : 'hover:bg-emerald-800 bg-emerald-700'}
            `}
          >
            {loading ? 'Adding...' : 'Add product'}
          </button>
        </>
      )}
    </form>
  )
}

const Input = ({ label, value, setValue, placeholder, type = 'text' }) => (
  <div>
    <p className='text-md p-3 text-neutral-200 tracking-widest font-bold'>{label}</p>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      className='sm:ml-3 md:w-45 w-70 p-2 text-lg tracking-widest text-white font-bold outline-none bg-neutral-600 rounded-lg'
    />
  </div>
)

const Price = ({ price, setPrice }) => (
  <div>
    <p className='text-md p-3 text-neutral-200 tracking-widest font-bold'>Product price</p>
    <input
      type='number'
      value={price}
      placeholder='Enter price'
      onChange={e => setPrice(e.target.value)}
      className='sm:ml-3 w-45 p-2 text-lg tracking-widest text-white font-bold outline-none bg-neutral-600 rounded-lg no-spinner'
    />
  </div>
)

export default Add
