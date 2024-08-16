import Swal from 'sweetalert2';

export const toastify = (delText: string, externalFunction: () => void) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'px-5 py-2 rounded-md bg-green-500 text-white',
      cancelButton: 'px-5 py-2 rounded-md bg-red-500 text-white',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        externalFunction();

        swalWithBootstrapButtons.fire({
          title: 'Deleted!',
          text: delText,
          icon: 'success',
        });
      }
    });
};

