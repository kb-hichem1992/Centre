import axios from './setupAxios'

export const fetchDiplomePDF = async (idinn, idformm, dateins, numagr, groupe) => {
    try {
      const response = await axios.get(
        `/report/DIPLOME/${idinn}/${idformm}/${dateins}/${numagr}/${groupe}`,
        {
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf',
          }
        }
      );
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
  
    } catch (error) {
      console.error('Error fetching diploma PDF:', error);
    }
  };


 export  const fetchEvaluationPDF = async (idin, dateins) => {
    try {
      const response = await axios.get(
        `/report/EVALUATION/${idin}/${dateins}`,
        {
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf',
          }
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);

    } catch (error) {
      console.error('Error fetching evaluation PDF:', error);
    }
  };

