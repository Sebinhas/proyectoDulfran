import useSuscribe from "./useSuscribe";
import { MdKeyboardBackspace, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from 'react';

const Suscribe = () => {
  const {
    navigate,
    register,
    handleSubmit,
    errors,
    previewUrl,
    handleImageChange,
    onSubmit,
  } = useSuscribe();

  const [showKeys, setShowKeys] = useState({
    wompi_public_key: false,
    wompi_private_key: false,
    wompi_integrity_secret: false,
    prod_wompi_public_key: false,
    prod_wompi_private_key: false,
    prod_wompi_integrity_secret: false
  });

  const toggleVisibility = (field: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 select-none">
      <div
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 w-12 h-12 flex items-center justify-center cursor-pointer rounded-full bg-[#101C42] hover:bg-[#1a2a5c] transition-all duration-300"
      >
        <MdKeyboardBackspace className="text-white text-2xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl py-2 font-bold bg-gradient-to-r from-[#101C42] to-[#2563eb] bg-clip-text text-transparent">
            Formulario de Registro
          </h1>
          <div className="h-1 w-60 mx-auto bg-gradient-to-r from-[#101C42] to-[#2563eb] rounded-full mt-2"></div>
        </div>

        {/* <div className="bg-[#f8faff] rounded-xl p-6 mb-10">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-[#101C42] to-[#2563eb] rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-[#101C42] mb-2">
                                ¡Bienvenido a Monedix Colombia!
                            </h2>
                            <p className="text-gray-600">
                                Estás a punto de simplificar la gestión de pagos de tu negocio. 
                                Completa el registro para acceder a nuestra plataforma y 
                                comenzar a recibir pagos de forma segura y eficiente.
                            </p>
                        </div>
                    </div>
                </div> */}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-[#101C42] mb-6 pb-2 border-b border-[#e5e9f5]">
              Datos de la Empresa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full mb-4">
                <div className="text-sm font-medium pb-0.5">
                  NIT <span className="text-red-500">*</span>
                </div>
                <input
                  {...register("nit", {
                    required: "El NIT es requerido",
                    pattern: {
                      value: /^[0-9]{7,10}$/,
                      message: "NIT inválido (7-10 dígitos)",
                    },
                  })}
                  placeholder="Ej: 1234567"
                  className={`w-full border rounded-md p-2 outline-none ${
                    errors.nit ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.nit && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.nit.message}
                  </span>
                )}
              </div>

              <div className="w-full mb-4">
                <div className="text-sm font-medium pb-0.5">
                  Nombre / Razón Social <span className="text-red-500">*</span>
                </div>
                <input
                  {...register("name", {
                    required: "El nombre es requerido",
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                  })}
                  placeholder="Ej: Juan Pérez"
                  className={`w-full border rounded-md p-2 outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className="w-full mb-4">
                <div className="text-sm font-medium pb-0.5">
                  Dirección <span className="text-red-500">*</span>
                </div>
                <input
                  {...register("address", {
                    required: "La dirección es requerida",
                    minLength: {
                      value: 5,
                      message: "La dirección debe tener al menos 5 caracteres",
                    },
                  })}
                  placeholder="Ej: Calle 123"
                  className={`w-full border rounded-md p-2 outline-none ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </span>
                )}
              </div>

              <div className="w-full mb-4">
                <div className="text-sm font-medium pb-0.5">Teléfono</div>
                <input
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                    minLength: {
                      value: 10,
                      message: "El teléfono debe tener al menos 10 dígitos",
                    },
                    maxLength: {
                      value: 10,
                      message: "El teléfono no puede tener más de 10 dígitos",
                    },
                  })}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Ej: 3178901234"
                  className={`w-full border rounded-md p-2 outline-none ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.phone.message || "Este campo es requerido"}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className="w-full mb-4">
                <div className="text-sm font-medium pb-0.5">
                  Ubicación <span className="text-red-500">*</span>
                </div>
                <input
                  {...register("location", {
                    required: "La ubicación es requerida",
                    minLength: {
                      value: 3,
                      message: "La ubicación debe tener al menos 3 caracteres",
                    },
                  })}
                  placeholder="Ej: Bogotá"
                  className={`w-full border rounded-md p-2 outline-none ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.location.message}
                  </span>
                )}
              </div>

              <div className="w-full mb-4">
                <div className="text-sm font-medium pb-0.5">
                  Correo Electrónico
                </div>
                <input
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  placeholder="Ej: email@example.com"
                  className={`w-full border rounded-md p-2 outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#101C42] mb-6 pb-2 border-b border-[#e5e9f5]">
              Credenciales Wompi (Desarrollo)
            </h2>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                Estas son las credenciales de prueba para el ambiente de
                desarrollo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Public Key (Desarrollo) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("wompi_public_key", {
                      required: "La Public Key es requerida",
                      pattern: {
                        value: /^pub_test_[A-Za-z0-9]+$/,
                        message: "Formato de Public Key inválido"
                      }
                    })}
                    type={showKeys.wompi_public_key ? "text" : "password"}
                    placeholder="pub_test_..."
                    className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#101C42] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility('wompi_public_key')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                  >
                    {showKeys.wompi_public_key ? 
                      <MdVisibilityOff className="w-5 h-5" /> : 
                      <MdVisibility className="w-5 h-5" />
                    }
                  </button>
                </div>
                {errors.wompi_public_key && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.wompi_public_key.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Private Key (Desarrollo) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("wompi_private_key", {
                      required: "La Private Key es requerida",
                      pattern: {
                        value: /^prv_test_[A-Za-z0-9]+$/,
                        message: "Formato de Private Key inválido"
                      }
                    })}
                    type={showKeys.wompi_private_key ? "text" : "password"}
                    placeholder="prv_test_..."
                    className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#101C42] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility('wompi_private_key')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                  >
                    {showKeys.wompi_private_key ? 
                      <MdVisibilityOff className="w-5 h-5" /> : 
                      <MdVisibility className="w-5 h-5" />
                    }
                  </button>
                </div>
                {errors.wompi_private_key && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.wompi_private_key.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Integrity Secret (Desarrollo) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("wompi_integrity_secret", {
                      required: "El Integrity Secret es requerido",
                      minLength: {
                        value: 10,
                        message: "El Integrity Secret debe tener al menos 10 caracteres"
                      }
                    })}
                    type={showKeys.wompi_integrity_secret ? "text" : "password"}
                    placeholder="test_integrity_..."
                    className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#101C42] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility('wompi_integrity_secret')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                  >
                    {showKeys.wompi_integrity_secret ? 
                      <MdVisibilityOff className="w-5 h-5" /> : 
                      <MdVisibility className="w-5 h-5" />
                    }
                  </button>
                </div>
                {errors.wompi_integrity_secret && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.wompi_integrity_secret.message}
                  </span>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#101C42] mb-6 pb-2 border-b border-[#e5e9f5]">
              Credenciales Wompi (Producción)
            </h2>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                Estas son las credenciales para el ambiente de producción.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Public Key (Producción)
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("prod_wompi_public_key", {
                      required: "La Public Key es requerida",
                      pattern: {
                        value: /^pub_prod_[A-Za-z0-9]+$/,
                        message: "Formato de Public Key inválido"
                      }
                    })}
                    type={showKeys.prod_wompi_public_key ? "text" : "password"}
                    placeholder="pub_prod_..."
                    className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#101C42] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility('prod_wompi_public_key')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                  >
                    {showKeys.prod_wompi_public_key ? 
                      <MdVisibilityOff className="w-5 h-5" /> : 
                      <MdVisibility className="w-5 h-5" />
                    }
                  </button>
                </div>
                {errors.prod_wompi_public_key && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.prod_wompi_public_key.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Private Key (Producción)
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("prod_wompi_private_key", {
                      required: "La Private Key es requerido",
                      minLength: {
                        value: 10,
                        message: "El Private Key debe tener al menos 10 caracteres"
                      }
                    })}
                    type={showKeys.prod_wompi_private_key ? "text" : "password"}
                    placeholder="prv_prod_..."
                    className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#101C42] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility('prod_wompi_private_key')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                  >
                    {showKeys.prod_wompi_private_key ? 
                      <MdVisibilityOff className="w-5 h-5" /> : 
                      <MdVisibility className="w-5 h-5" />
                    }
                  </button>
                </div>
                {errors.prod_wompi_private_key && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.prod_wompi_private_key.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Integrity Secret (Producción)
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("prod_wompi_integrity_secret", {
                      required: "El Integrity Secret es requerido",
                      minLength: {
                        value: 10,
                        message: "El Integrity Secret debe tener al menos 10 caracteres"
                      }
                    })}
                    type={showKeys.prod_wompi_integrity_secret ? "text" : "password"}
                    placeholder="prod_integrity_..."
                    className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-[#101C42] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility('prod_wompi_integrity_secret')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#101C42]"
                  >
                    {showKeys.prod_wompi_integrity_secret ? 
                      <MdVisibilityOff className="w-5 h-5" /> : 
                      <MdVisibility className="w-5 h-5" />
                    }
                  </button>
                </div>
                {errors.prod_wompi_integrity_secret && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.prod_wompi_integrity_secret.message}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Logo de la Empresa */}
          <section>
            <h2 className="text-2xl font-semibold text-[#101C42] mb-6 pb-2 ">
              Logo de la Empresa
            </h2>
            <div className="w-full">
              <label htmlFor="logo-upload" className="block">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#101C42] transition-all duration-300 cursor-pointer">
                  <div className="space-y-2 text-center">
                    {previewUrl ? (
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={previewUrl}
                          alt="Logo preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <p className="text-sm text-gray-500">
                          Click para cambiar la imagen
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#101C42] to-[#2563eb]">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <span className="relative font-medium text-[#2563eb] hover:text-[#101C42] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#101C42]">
                            Sube un archivo
                          </span>
                          <p className="pl-1">o arrastra y suelta</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF hasta 50MB
                        </p>
                      </>
                    )}
                    <input
                      id="logo-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        register("logo_url", {
                          validate: () => {
                            const file = e.target.files?.[0];
                            return !file || file.size <= 10000000;
                          }
                        }).onChange(e);
                        handleImageChange(e);
                      }}
                    />
                  </div>
                </div>
              </label>
              {errors.logo_url && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.logo_url.message}
                </p>
              )}
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-lg text-[#101C42] border border-[#101C42] hover:bg-gray-50 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[#101C42] to-[#2563eb] hover:opacity-90 transition-all duration-300"
            >
              Registrar Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Suscribe;
